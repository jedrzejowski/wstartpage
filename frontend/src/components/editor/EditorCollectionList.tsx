import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../data/hooks';
import {useGetTileCollectionListQuery} from '../../data/api/apiBackend';
import {
  selectEditorSelectedIconCollectionName,
  updateTileCollectionAction
} from '../../data/slice/normalizedTileCollections';
import {setEditorSelectedTileCollectionNameAction} from '../../data/slice/editor';
import {List, ListItem} from '../ui/List';

export const EditorCollectionList: FC = React.memo(props => {
  const dispatch = useAppDispatch();
  const collectionListQuery = useGetTileCollectionListQuery();
  const editedIconCollections = useAppSelector(state => state.editor.editedIconCollections);
  const selectedIconCollectionName = useAppSelector(selectEditorSelectedIconCollectionName);
  const includedCollectionsInCurrentlyEditedCollection = useAppSelector(state => {
    if (!state.editor.selectedObj) return null;
    if ('tileCollectionName' in state.editor.selectedObj) {
      const collection = state.normalizedTileCollection.collections[state.editor.selectedObj.tileCollectionName];
      if (!collection) return null;
      return collection.includes;
    } else return null;
  });

  if (!collectionListQuery.data) {
    return null;
  }

  return <List>
    {collectionListQuery.data.map(collectionName => {

      return <ListItem
        key={collectionName}
        main={<>
          {collectionName}
          {editedIconCollections.includes(collectionName) ? '*' : null}
        </>}
        onClick={handleClickFactory(collectionName)}
        selected={collectionName === selectedIconCollectionName}
        actions={[
          includedCollectionsInCurrentlyEditedCollection ? {
            disabled: includedCollectionsInCurrentlyEditedCollection.includes(collectionName) || collectionName === selectedIconCollectionName,
            icon: 'plus',
            onClick(e) {
              e.stopPropagation();
              if (!selectedIconCollectionName) return;
              dispatch(updateTileCollectionAction({
                collectionName: selectedIconCollectionName,
                collection: {
                  includes: [...includedCollectionsInCurrentlyEditedCollection, collectionName]
                }
              }));
            }
          } : null
        ]}
      />;
    })}
  </List>;

  function handleClickFactory(iconCollectionName: string) {
    return () => {
      // dispatch(normalizedIconCollectionSlice.actions.requestCollectionLoad({collectionName: iconCollectionName}));
      dispatch(setEditorSelectedTileCollectionNameAction(iconCollectionName));
    };
  }
});

export default EditorCollectionList;
