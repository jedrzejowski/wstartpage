import React, {FC} from 'react';
import TextInput from '../input/TextInput';
import {
  moveTileAction,
  normalizedIconCollectionSlice,
  updateTileAction,
  useNormalizedTile
} from '../../data/slice/normalizedIconCollections';
import type {TileT, TextIconT, UrlIconT} from '../../types';
import {useAppDispatch} from '../../data/hooks';
import CheckBoxInput from '../input/CheckBoxInput';
import {isTextIconT, isUrlIconT} from '../../types';
import editorSlice, {markCurrentCollectionAsEditedAction} from '../../data/slice/editorSlice';
import ColorInput from '../input/ColorInput';
import {FlexExpand, HFlexContainer, PaddedRoot} from '../UtilityElements';
import Button from '../input/Button';
import NumberInput from '../input/NumberInput';
import MdiIcon from '../MdiIcon';
import SelectInput from '../input/SelectInput';

const ICON_RESTORE_CACHE: Partial<Record<string, {
  urlIcon?: UrlIconT;
  textIcon?: TextIconT;
}>> = {};

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

    <SelectInput
      label="Typ ikony"
      value={null}
      onChange={() => {
      }}
      options={[
        {value: null, label: 'Brak'},
        {value: 'text', label: 'Tekst'},
        {value: 'url', label: 'Obraz'},
      ]}
    />

    <TextInput label="Tytuł" value={tile.title} onChange={handleChangeFactory('title')}/>
    <TextInput label="URL" value={tile.url} onChange={handleChangeFactory('url')}/>
    <CheckBoxInput label="Ikona tekstowa" value={isTextIconT(tile.icon)} onChange={handleIconTypeChange}/>
    {isTextIconT(tile.icon) ? (<>
      <TextInput label="Test" value={tile.icon.text ?? ''}
                 onChange={handleIconChangeFactory('text')}/>
      <ColorInput label="Kolor" value={tile.icon.bgColor}
                  onChange={handleIconChangeFactory('bgColor')}/>
      <NumberInput label="Wielkość czcionki" value={tile.icon.fontSize}
                   onChange={handleIconChangeFactory('fontSize')}/>
    </>) : (
      <TextInput label="Ikona" value={tile.icon ?? ''} onChange={handleChangeFactory('icon')}/>
    )}
  </PaddedRoot>;

  function handleChangeFactory(field: keyof TileT) {
    return (newValue: string) => {
      if (!tile) {
        return null;
      }

      const newTile = {
        ...tile,
        [field]: newValue,
      };

      dispatch(updateTileAction({tileId, tile: newTile}));
      dispatch(markCurrentCollectionAsEditedAction());
    };
  }

  function handleIconChangeFactory(field: keyof TextIconT) {
    return (newValue: any) => {
      if (!tile) {
        return null;
      }

      if (!isTextIconT(tile.icon)) {
        return;
      }

      switch (field) {
        case 'bgColor':
          newValue = newValue.hex;
          break;
      }

      const newTile: TileT = {
        ...tile,
        icon: {
          ...tile.icon,
          [field]: newValue
        }
      };

      dispatch(updateTileAction({tileId, tile: newTile}));
      dispatch(markCurrentCollectionAsEditedAction());
    };
  }

  function handleIconTypeChange(isText: boolean) {
    if (!tile) {
      return null;
    }

    const current_cache = ICON_RESTORE_CACHE[tile.url] ?? (ICON_RESTORE_CACHE[tile.url] = {});

    if (isText) {

      dispatch(updateTileAction({
        tileId,
        tile: {
          ...tile,
          icon: current_cache.textIcon ?? {
            text: tile.title.substring(0, 3),
            bgColor: '#FF0000',
            fontSize: 30,
          },
        }
      }));

    } else {

      dispatch(updateTileAction({
        tileId,
        tile: {
          ...tile,
          icon: current_cache.urlIcon ?? '',
        }
      }));

    }

    dispatch(markCurrentCollectionAsEditedAction());

    if (isUrlIconT(tile.icon))
      current_cache.urlIcon = tile.icon;
    if (isTextIconT(tile.icon))
      current_cache.textIcon = tile.icon;
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
