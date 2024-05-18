import {FC, memo, useState} from 'react';
import Button from '../input/Button';
import {useAppSelector, useAppStore} from '../../data/hooks';
import {getTileCollectionFromState} from '../../data/slice/normalizedTileCollections';
import {useUpdateTileCollectionMutation} from '../../data/slice/apiSlice.ts';
import Dialog from "../Dialog.tsx";

type MyState = 'idle' | 'fetching' | 'error' | 'success';

export const SaveButton: FC = props => {
  const [myState, setMyState] = useState<MyState>('idle');
  const store = useAppStore();
  const selectedIconCollectionName = useAppSelector(state => state.editor.currentCollectionName);
  const [saveCollection, result] = useUpdateTileCollectionMutation();

  return <>
    <Button
      disabled={myState === 'fetching'}
      onClick={handleSave}
      startIcon="content-save-icon"
    >
      Zapisz
    </Button>

    <Dialog open={myState == 'success'}>
      <Dialog.Title>
        {myState == 'success' && 'Zapisano'}
        {myState == 'error' && 'Wystąpił błąd'}
      </Dialog.Title>
      <Dialog.ActionFooter>
        <Button onClick={() => setMyState('idle')}>
          OK
        </Button>
      </Dialog.ActionFooter>
    </Dialog>
  </>;

  async function handleSave() {
    if (!selectedIconCollectionName) {
      return;
    }

    setMyState('fetching');

    const tileCollection = getTileCollectionFromState(store.getState().normalizedTileCollection, selectedIconCollectionName);

    try {
      await saveCollection(tileCollection);
      setMyState('success');
    } catch (e) {
      setMyState('error');
    }

  }
};


export default memo(SaveButton);
