import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {useAppSelector} from "../hooks";

interface EditorData {
    selectedIconCollectionName: string | null;
}

const initialState: EditorData = {
    selectedIconCollectionName: null,
};

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setSelectedIconCollectionName(state, action: PayloadAction<string>) {
            state.selectedIconCollectionName = action.payload;
        },
    }
})

export default editorSlice;

