import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import {
  addTileAction,
  addTileSectionAction,
  updateTileAction,
  updateTileSectionAction
} from './normalizedTileCollections';

interface EditorStateT {
  currentCollectionName: string | null;
  selectedObj:
    | { collectionName: string; }
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
      state.selectedObj = {collectionName: action.payload};
    },
    setEditorSelectedObjAction(state, action: PayloadAction<EditorStateT['selectedObj']>) {
      state.selectedObj = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(addTileAction, (state, action) => {
      const {tileId} = action.payload;
      state.selectedObj = {tileId};
      markCurrentCollectionAsEdited(state);
    })
    .addCase(addTileSectionAction, (state, action) => {
      const {sectionId} = action.payload;
      state.selectedObj = {sectionId};
      markCurrentCollectionAsEdited(state);
    })
    .addCase(updateTileAction, markCurrentCollectionAsEdited)
    .addCase(updateTileSectionAction, markCurrentCollectionAsEdited)
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

