import React, {FC} from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../../data/hooks';
import {useGetTileCollectionListQuery} from '../../data/api/apiBackend';
import {selectEditorSelectedIconCollectionName} from '../../data/slice/normalizedIconCollections';
import {setEditorSelectedTileCollectionNameAction} from '../../data/slice/editor';

export const TileCollectionList: FC = React.memo(props => {
  const collectionListQuery = useGetTileCollectionListQuery(undefined);
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
      dispatch(setEditorSelectedTileCollectionNameAction(iconCollectionName));
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

export default TileCollectionList;
