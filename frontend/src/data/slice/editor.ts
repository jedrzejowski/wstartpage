import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import {anyTileMutAction, tileMutActions} from './normalizedTileCollections';

interface EditorStateT {
  currentCollectionName: string | null;
  selectedObj:
    | { tileCollectionName: string; }
    | { sectionId: string; }
    | { tileId: string; }
    | null;
  editedIconCollections: string[];
}

let i = 0;

const initialState: EditorStateT = {
  currentCollectionName: null,
  selectedObj: null,
  editedIconCollections: [],
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditorSelectedTileCollectionNameAction(state, action: PayloadAction<string>) {
      state.currentCollectionName = action.payload;
      state.selectedObj = {tileCollectionName: action.payload};
    },
    setEditorSelectedObjAction(state, action: PayloadAction<EditorStateT['selectedObj']>) {
      state.selectedObj = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(tileMutActions.addTile, (state, action) => {
      const {tileId} = action.payload;
      state.selectedObj = {tileId};
    })
    .addCase(tileMutActions.addTileSection, (state, action) => {
      const {sectionId} = action.payload;
      state.selectedObj = {sectionId};
    })
    .addCase(tileMutActions.deleteTile, (state, action) => {
      state.selectedObj = null;
    })
    .addCase(tileMutActions.deleteTileSection, (state, action) => {
      state.selectedObj = null;
    })
    .addMatcher(anyTileMutAction, markCurrentCollectionAsEdited)
});

export const {
  setEditorSelectedTileCollectionNameAction,
  setEditorSelectedObjAction,
} = editorSlice.actions;

function markCurrentCollectionAsEdited(state: Draft<EditorStateT>) {
  if (state.currentCollectionName) {
    state.editedIconCollections.push(state.currentCollectionName);
  }
}

export const useIsSelectedInEditor = (type: 'section' | 'tile', id: string): boolean => useAppSelector(state => {
  const selectedObj = state.editor.selectedObj;

  if (selectedObj === null) {
    return false;
  }

  switch (type) {
    case 'tile':
      return 'tileId' in selectedObj && selectedObj.tileId === id;
    case 'section':
      return 'sectionId' in selectedObj && selectedObj.sectionId === id;
    default:
      return false;
  }
});

export default editorSlice;

