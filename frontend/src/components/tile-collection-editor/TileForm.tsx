import React, {ChangeEvent, FC} from 'react';
import TextInput from '../input/TextInput';
import {
  moveTileAction,
  updateTileAction, updateTileIconAction,
  useNormalizedTile
} from '../../data/slice/normalizedTileCollections';
import type {TileT, TextIconT, UrlIconT} from '../../data/tileCollection';
import {useAppDispatch} from '../../data/hooks';
import CheckBoxInput from '../input/CheckBoxInput';
import {isTextIconT, isUrlIconT} from '../../data/tileCollection';
import ColorInput from '../input/ColorInput';
import {FlexExpand, HFlexContainer, PaddedRoot} from '../UtilityElements';
import Button from '../input/Button';
import NumberInput from '../input/NumberInput';
import MdiIcon from '../MdiIcon';
import SelectInput from '../input/SelectInput';

export const TileForm: FC<{
  tileId: string;
}> = React.memo(({tileId}) => {
  const tile = useNormalizedTile(tileId);
  const dispatch = useAppDispatch();

  if (!tile) {
    return null;
  }

  return <PaddedRoot>

    <HFlexContainer>
      <Button onClick={handleMoveToLeftClick} startIcon="arrow-left"/>
      <FlexExpand/>
      <Button onClick={handleDeleteClick} startIcon={<MdiIcon icon="delete" color="red"/>}/>
      <FlexExpand/>
      <Button onClick={handleMoveToRightClick} startIcon="arrow-right"/>
    </HFlexContainer>

    <TextInput label="Tytuł" value={tile.title} onValueChange={handleChangeFactory('title')}/>
    <TextInput label="URL" value={tile.url} onValueChange={handleChangeFactory('url')}/>

    <SelectInput<null | 'text' | 'url'>
      label="Typ ikony"
      value={isTextIconT(tile.icon) ? 'text' : isUrlIconT(tile.icon) ? 'url' : null}
      onValueChange={(value) => dispatch(updateTileIconAction({tileId, iconType: value}))}
      options={[
        {value: null, label: 'Brak'},
        {value: 'text', label: 'Tekst'},
        {value: 'url', label: 'Obraz'},
      ]}
    />

    {isTextIconT(tile.icon) ? (<>
      <TextIconEditor value={tile.icon} onValueChange={handleChangeFactory('icon')}/>
    </>) : isUrlIconT(tile.icon) ? (
      <TextInput label="Adres ikony" value={tile.icon ?? ''} onValueChange={handleChangeFactory('icon')}/>
    ) : null}
  </PaddedRoot>;

  function handleChangeFactory<K extends keyof TileT>(field: K) {
    return (newValue: TileT[K]) => {
      dispatch(updateTileAction({tileId, tile: {[field]: newValue}}));
    };
  }

  function handleMoveToLeftClick(e: React.MouseEvent) {
    dispatch(moveTileAction({tileId, offset: -1}));
  }

  function handleDeleteClick(e: React.MouseEvent) {

  }

  function handleMoveToRightClick(e: React.MouseEvent) {
    dispatch(moveTileAction({tileId, offset: 1}));
  }
});


export default TileForm;

const TextIconEditor: FC<{ value: TextIconT; onValueChange: (value: TextIconT) => void; }> = props => {
  const {value, onValueChange} = props;

  return <>
    <TextInput
      label="Tekst ikony"
      value={value.text}
      onValueChange={text => onValueChange({...value, text})}
    />
    <ColorInput
      label="Kolor ikony"
      value={value.bgColor}
      onValueChange={bgColor => onValueChange({...value, bgColor: bgColor.hex})}
    />
    <NumberInput
      label="Wielkość czcionki ikonyy"
      value={value.fontSize}
      onValueChange={fontSize => onValueChange({...value, fontSize})}
    />
  </>;
};
