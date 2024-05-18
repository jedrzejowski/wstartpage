import React, {FC} from 'react';
import {tileMutActions, useNormalizedTileCollection} from '../../data/slice/normalizedTileCollections';
import EditableList, {EditableListChangeAction} from '../input/EditableList';
import {useAppDispatch} from '../../data/hooks';
import {PaddedRoot} from '../UtilityElements';
import Typography from '../ui/Typography';

export const TileCollectionEditForm: FC<{
  tileCollectionName: string;
}> = props => {
  const {tileCollectionName} = props;

  const dispatch = useAppDispatch();
  const collection = useNormalizedTileCollection(tileCollectionName);

  const collectionIncludes = collection.includes ?? [];

  return <PaddedRoot>

    <Typography variant="h6">Dołączone kolekcje:</Typography>
    <EditableList list={collectionIncludes} onChange={updateCollectionIncludes}/>

  </PaddedRoot>;

  function updateCollectionIncludes(action: EditableListChangeAction<string>) {
    let copyOfIncludes = [...collectionIncludes];

    if (action.up) {
      [copyOfIncludes[action.index], copyOfIncludes[action.index - 1]] = [copyOfIncludes[action.index - 1], copyOfIncludes[action.index]];
    }

    if (action.down) {
      [copyOfIncludes[action.index], copyOfIncludes[action.index + 1]] = [copyOfIncludes[action.index + 1], copyOfIncludes[action.index]];
    }

    if (action.del) {
      copyOfIncludes.splice(action.index, 1);
    }

    dispatch(tileMutActions.updateTileCollection({
      collectionName: tileCollectionName,
      collection: {
        includes: copyOfIncludes,
      }
    }));
  }
};

export default React.memo(TileCollectionEditForm);

