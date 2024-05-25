import React, {FC, ReactNode} from 'react';
import {tileMutActions, useNormalizedTileCollection} from '../../data/slice/normalizedTileCollections';
import EditableList, {EditableListChangeAction} from '../input/EditableList';
import {useAppDispatch} from '../../data/hooks';
import {PaddedRoot} from '../UtilityElements';
import Typography from '../ui/Typography';
import SelectInput, {SelectInputOptions} from "../input/SelectInput.tsx";
import {TileCollectionTheme} from "../../data/tileCollection.ts";

const themeOptions: SelectInputOptions<TileCollectionTheme> = [
  {value: TileCollectionTheme.SYSTEM_DEFAULT, label: 'Domyślny'},
  {value: TileCollectionTheme.LIGHT, label: 'Jasny'},
  {value: TileCollectionTheme.DARK, label: 'Ciemny'},
];

export const TileCollectionEditForm: FC<{
  tileCollectionName: string;
}> = props => {
  const {tileCollectionName} = props;

  const dispatch = useAppDispatch();
  const collection = useNormalizedTileCollection(tileCollectionName);

  const collectionIncludes = collection.includes ?? [];

  return <PaddedRoot>

    <SelectInput
      label="Temat"
      value={collection.theme}
      onValueChange={(theme) => {
        dispatch(tileMutActions.updateTileCollection({
          collectionName: tileCollectionName,
          collection: {theme}
        }));
      }}
      options={themeOptions}
    />

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

