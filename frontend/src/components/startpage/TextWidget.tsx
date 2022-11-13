import styled from 'styled-components';
import React, {FC, MouseEvent} from 'react';
import {useNormalizedTile, addTileAction} from '../../data/slice/normalizedTileCollections';
import {setEditorSelectedObjAction, useIsSelectedInEditor} from '../../data/slice/editor';
import {useIsEditor} from '../editor/EditorContext';
import clsx from 'clsx';
import {useAppDispatch} from '../../data/hooks';
import {makeUniqueId} from '../../data/uniqueId';

export const TextWidget: FC<{
  tileId: string,
}> = React.memo(({tileId}) => {
  const widget = useNormalizedTile(tileId);
  const isEditor = useIsEditor();
  const isSelected = useIsSelectedInEditor('tile', tileId);
  const dispatch = useAppDispatch();

  if (!widget) {
    throw new Error(`Tile of id '${tileId}' does not exists`);
  }

  return <Root
    href={widget.url}
    target="_parent"
    className={clsx('selected' && isSelected)}
    onClick={handleClick}
  >
    <span>{widget.title}</span>
  </Root>;

  function handleClick(e: MouseEvent) {
    if (isEditor) {
      e.preventDefault();
      dispatch(setEditorSelectedObjAction({tileId}));
    }
  }
});

export default TextWidget;

export const AddTextWidgetButton: FC<{
  sectionId: string,
}> = React.memo(({sectionId}) => {
  const dispatch = useAppDispatch();

  return <AddButtonRoot onClick={handleClick}>
    Dodaj<br/>ikonę
  </AddButtonRoot>;

  function handleClick() {
    dispatch(addTileAction({sectionId, tileId: makeUniqueId()}));
  }
});

const Root = styled.a`
  display: flex;
  box-sizing: border-box;
  height: 50px;
  cursor: pointer;
  font-size: 2em;
  color: var(--font-color);
  padding: 0 ${props => props.theme.spacing(3)};
  text-decoration: none;
  align-items: center;

  &:hover {
    background: #bbbebf;
  }
`;

const AddButtonRoot = styled(Root)`
  font-size: 1em;
  opacity: 0.5;
`;
