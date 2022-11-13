import React, {FC, MouseEvent, useEffect, useState} from 'react';
import TileIcon from './TileIcon';
import styled from 'styled-components';
import {searchEngine, useSearchQuery} from '../../data/slice/searchSlice';
import {setEditorSelectedObjAction, useIsSelectedInEditor} from '../../data/slice/editor';
import {useIsEditor} from '../editor/EditorContext';
import {useAppDispatch, useAppSelector} from '../../data/hooks';
import {useNormalizedTile, addTileAction} from '../../data/slice/normalizedTileCollections';
import {makeUniqueId} from '../../data/uniqueId';

const Tile: FC<{
  tileId: string;
}> = ({tileId}) => {
  const searchQuery = useSearchQuery();
  const [visible, setVisible] = useState(true);
  const showTitles = useAppSelector(state => state.pageSettings.showTitles) ?? true;
  const widget = useNormalizedTile(tileId);
  const isSelected = useIsSelectedInEditor('tile', tileId);
  const isEditor = useIsEditor();
  const dispatch = useAppDispatch();

  if (!widget) {
    throw new Error();
  }

  useEffect(() => {

    if (searchQuery) {
      setVisible(widget.title ? searchEngine(searchQuery, widget.title) : false);
    } else {
      setVisible(true);
    }
  }, [searchQuery]);

  const url = widget.url === '#' ? undefined : widget.url;

  return (
    <Root
      href={url}
      target="_parent"
      style={{
        display: visible ? undefined : 'none',
      }}
      isSelected={isSelected}
      onClick={handleClick}
    >
      <IconRoot>
        <TileIcon icon={widget.icon ?? '!text=: (&bgColor=#0079d9&fontSize=32'}/>
      </IconRoot>

      <TitleRoot visible={showTitles}>
        {widget.title}
      </TitleRoot>

    </Root>
  );

  function handleClick(e: MouseEvent) {
    if (isEditor) {
      e.preventDefault();
      dispatch(setEditorSelectedObjAction({tileId}));
    }
  }
};

export const AddTileButton: FC<{
  sectionId: string,
}> = React.memo(({sectionId}) => {
  const dispatch = useAppDispatch();

  return <AddButtonRoot onClick={handleClick}>
    <div>Dodaj ikonę</div>
  </AddButtonRoot>;

  function handleClick() {
    dispatch(addTileAction({sectionId, tileId: makeUniqueId()}));
  }
});


const Root = styled.a<{ isSelected: boolean }>`
  display: block;
  cursor: pointer;
  width: ${props => props.theme.iconSize}px;
  box-sizing: border-box;
  text-decoration: none;
  margin-top: ${props => props.theme.spacing(1.5)};
  margin-left: ${props => props.theme.spacing(1.5)};
  margin-right: ${props => props.theme.spacing(1.5)};
  margin-bottom: ${props => props.theme.spacing(0.5)};

  ${props => props.isSelected ? `
    outline: 2px solid rgb(0 102 255 / 55%);
    outline-offset: ${props.theme.spacing()}
    ` : ''}
`;

const IconRoot = styled.div`
  margin-bottom: ${props => props.theme.spacing(1)};
`;

const TitleRoot = styled.div<{ visible: boolean }>`
  display: ${props => props.visible ? 'block' : 'none'};
  width: 100%;
  color: black;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0.5;
  font-size: 0.8em;
`;

const AddButtonRoot = styled.div`
  display: block;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  cursor: pointer;
  margin-left: ${props => props.theme.spacing(1.5)};
  font-size: 0.8em;

  > div {
    opacity: 0.5;
    text-align: center;
  }
`;

export default Tile;
