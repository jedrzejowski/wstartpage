import {FC, memo} from 'react';
import TextInput from '../input/TextInput';
import {tileMutActions, useNormalizedTile} from '../../data/slice/normalizedTileCollections';
import type {TileT, TextIconT} from '../../data/tileCollection';
import {useAppDispatch} from '../../data/hooks';
import {isTextIconT, isUrlIconT} from '../../data/tileCollection';
import ColorInput from '../input/ColorInput';
import {PaddedRoot} from '../UtilityElements';
import Button from '../input/Button';
import NumberInput from '../input/NumberInput';
import MdiIcon from '../MdiIcon';
import SelectInput from '../input/SelectInput';
import Toolbar from "../Toolbar.tsx";

function TileEditForm(props: { tileId: string; }) {
  const {tileId} = props;
  const tile = useNormalizedTile(tileId);
  const dispatch = useAppDispatch();

  if (!tile) {
    return null;
  }

  return <PaddedRoot>

    <Toolbar>
      <Button onClick={handleMoveToLeftClick} startIcon="arrow-left"/>
      <Toolbar.Expand/>
      <Button onClick={handleDeleteClick} startIcon={<MdiIcon icon="delete" color="red"/>}/>
      <Toolbar.Expand/>
      <Button onClick={handleMoveToRightClick} startIcon="arrow-right"/>
    </Toolbar>

    <TextInput label="Tytuł" value={tile.title} onValueChange={handleChangeFactory('title')}/>
    <TextInput label="URL" value={tile.url} onValueChange={handleChangeFactory('url')}/>

    <SelectInput<null | 'text' | 'url'>
      label="Typ ikony"
      value={isTextIconT(tile.icon) ? 'text' : isUrlIconT(tile.icon) ? 'url' : null}
      onValueChange={(value) => dispatch(tileMutActions.updateTileIcon({tileId, iconType: value}))}
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
      dispatch(tileMutActions.updateTile({tileId, tile: {[field]: newValue}}));
    };
  }

  function handleMoveToLeftClick() {
    dispatch(tileMutActions.moveTile({tileId, offset: -1}));
  }

  function handleDeleteClick() {
    dispatch(tileMutActions.deleteTile({tileId}));
  }

  function handleMoveToRightClick() {
    dispatch(tileMutActions.moveTile({tileId, offset: 1}));
  }
}

export default memo(TileEditForm);

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
