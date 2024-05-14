import React, {FC, useState} from 'react';
import Button from '../input/Button';
import {useAppSelector, useAppStore} from '../../data/hooks';
import {getTileCollectionFromState} from '../../data/slice/normalizedTileCollections';
import {useUpdateTileCollectionMutation} from '../../data/slice/apiSlice.ts';

type MyState = 'idle' | 'fetching';

export const SaveButton: FC = React.memo(props => {
  const [myState, setMyState] = useState<MyState>('idle');
  const store = useAppStore();
  const selectedIconCollectionName = useAppSelector(state => state.editor.currentCollectionName);
  const [saveCollection, result] = useUpdateTileCollectionMutation();

  return <Button
    disabled={myState === 'fetching'}
    onClick={handleSave}
    startIcon="content-save-icon"
  >
    Zapisz
  </Button>;

  function handleSave() {
    if (!selectedIconCollectionName) {
      return;
    }

    const tileCollection = getTileCollectionFromState(store.getState().normalizedTileCollection, selectedIconCollectionName);

    console.log('HER', tileCollection);
    saveCollection(tileCollection);

  }
});


export default SaveButton;
