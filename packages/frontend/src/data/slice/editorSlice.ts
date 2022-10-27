import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from '../hooks';
import {addTileSectionAction, addTileAction} from '../actions';

interface EditorData {
  isOn: boolean;
  selectedIconCollectionName: string | null;
  selectedObj:
    | { iconCollectionName: string; }
    | { sectionId: string; }
    | { tileId: string; }
    | null;
  editedIconCollections: string[];
}

let i = 0;

const initialState: EditorData = {
  isOn: false,
  selectedIconCollectionName: null,
  selectedObj: null,
  editedIconCollections: [],
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setSelectedIconCollectionNameAction(state, action: PayloadAction<string>) {
      state.selectedIconCollectionName = action.payload;
      state.selectedObj = {iconCollectionName: action.payload};
    },
    setIsOn(state, action: PayloadAction<boolean>) {
      state.isOn = action.payload;
    },
    setEditorSelectedObjAction(state, action: PayloadAction<EditorData['selectedObj']>) {
      state.selectedObj = action.payload;
    },
    markCurrentCollectionAsEditedAction(state, action: PayloadAction) {
      if (state.selectedIconCollectionName) {
        state.editedIconCollections.push(state.selectedIconCollectionName);
      }
    }
  },
  extraReducers: (builder) => builder
    .addCase(addTileAction, (state, action) => {
      const {tileId} = action.payload;
      state.selectedObj = {tileId};
    })
    .addCase(addTileSectionAction, (state, action) => {
      const {sectionId} = action.payload;
      state.selectedObj = {sectionId};
    })
});

export const {
  setSelectedIconCollectionNameAction,
  setEditorSelectedObjAction,
  markCurrentCollectionAsEditedAction,
} = editorSlice.actions;

export const useIsEditor = () => useAppSelector(state => state.editor.isOn);
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

