import React, {FC} from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../../data/hooks';
import {useGetIconCollectionListQuery} from '../../data/api/apiBackend';
import {selectEditorSelectedIconCollectionName} from '../../data/slice/normalizedIconCollections';
import {setEditorSelectedIconCollectionNameAction} from '../../data/slice/editorSlice';

export const EditorIconCollectionList: FC = React.memo(props => {
  const collectionListQuery = useGetIconCollectionListQuery(undefined);
  const selectedIconCollectionName = useAppSelector(selectEditorSelectedIconCollectionName);
  const editedIconCollections = useAppSelector(state => state.editor.editedIconCollections);
  const dispatch = useAppDispatch();

  if (!collectionListQuery.data) {
    return null;
  }

  return <>
    {collectionListQuery.data.map(iconCollectionName => {

      const Root = iconCollectionName === selectedIconCollectionName ? SelectedItem : Item;

      return <Root
        key={iconCollectionName}
        onClick={handleClickFactory(iconCollectionName)}
      >
        {iconCollectionName}
        {editedIconCollections.includes(iconCollectionName) ? '*' : null}
      </Root>;
    })}
  </>;

  function handleClickFactory(iconCollectionName: string) {
    return () => {
      // dispatch(normalizedIconCollectionSlice.actions.requestCollectionLoad({collectionName: iconCollectionName}));
      dispatch(setEditorSelectedIconCollectionNameAction(iconCollectionName));
    };
  }
});

const Item = styled.div`
  padding: ${props => props.theme.spacing(2)};
  cursor: pointer;
  user-select: none;

  & + & {
    border-top: 1px solid ${props => props.theme.color.border};
  }

  &:hover {
    background-color: ${props => props.theme.color.border};
  }
`;

const SelectedItem = styled(Item)`
  background-color: ${props => props.theme.color.border};
`;

export default EditorIconCollectionList;
