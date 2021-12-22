import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";

interface EditorData {
    isOn: boolean;
    selectedIconCollectionName: string | null;
    selectedObj: {
        iconCollectionName: string;
    } | {
        sectionId: number;
    } | {
        widgetId: number;
    } | null;
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
    name: "editor",
    initialState,
    reducers: {
        setSelectedIconCollectionName(state, action: PayloadAction<string>) {
            state.selectedIconCollectionName = action.payload;
            state.selectedObj = {iconCollectionName: action.payload};
        },
        setIsOn(state, action: PayloadAction<boolean>) {
            state.isOn = action.payload;
        },
        setSelectedObj(state, action: PayloadAction<EditorData["selectedObj"]>) {
            state.selectedObj = action.payload;
        },
        makeCurrentCollectionAsEdited(state, action: PayloadAction) {
            if (state.selectedIconCollectionName) {
                state.editedIconCollections.push(state.selectedIconCollectionName);
            }
        }
    }
});

export const useIsEditor = () => useAppSelector(state => state.editor.isOn);

export default editorSlice;

