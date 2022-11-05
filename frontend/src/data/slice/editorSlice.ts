import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import {
  addTileAction,
  addTileSectionAction,
  updateTileAction,
  updateTileSectionAction
} from './normalizedIconCollections';

interface EditorStateT {
  selectedIconCollectionName: string | null;
  selectedObj:
    | { iconCollectionName: string; }
    | { sectionId: string; }
    | { tileId: string; }
    | null;
  editedIconCollections: string[];
}

let i = 0;

const initialState: EditorStateT = {
  selectedIconCollectionName: null,
  selectedObj: null,
  editedIconCollections: [],
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditorSelectedIconCollectionNameAction(state, action: PayloadAction<string>) {
      state.selectedIconCollectionName = action.payload;
      state.selectedObj = {iconCollectionName: action.payload};
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
  setEditorSelectedIconCollectionNameAction,
  setEditorSelectedObjAction,
} = editorSlice.actions;

function markCurrentCollectionAsEdited(state: Draft<EditorStateT>) {
  if (state.selectedIconCollectionName) {
    state.editedIconCollections.push(state.selectedIconCollectionName);
  }
}

export const useIsSelected = (type: 'section' | 'tile', id: string): boolean => useAppSelector(state => {
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

