import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";

interface EditorData {
    isOn: boolean;
    selectedIconCollectionName: string | null;
    selectedObj: {
        iconCollectionName: number;
    } | {
        sectionId: number;
    } | {
        widgetId: number;
    } | null;
}

let i = 0;

const initialState: EditorData = {
    isOn: false,
    selectedIconCollectionName: null,
    selectedObj: null,
};

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setSelectedIconCollectionName(state, action: PayloadAction<string>) {
            state.selectedIconCollectionName = action.payload;
        },
        setIsOn(state, action: PayloadAction<boolean>) {
            state.isOn = action.payload;
        },
        setSelectedObj(state, action: PayloadAction<EditorData["selectedObj"]>) {
            console.log('HERE')
            state.selectedObj = action.payload;
        },
    }
});

export const useIsEditor = () => useAppSelector(state => state.editor.isOn);

export default editorSlice;

