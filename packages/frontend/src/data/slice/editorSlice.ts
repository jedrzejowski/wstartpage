import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";
import actions from "../actions";

interface EditorData {
    isOn: boolean;
    selectedIconCollectionName: string | null;
    selectedObj:
        | { iconCollectionName: string; }
        | { sectionId: string; }
        | { widgetId: string; }
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
    },
    extraReducers: (builder) => builder
        .addCase(actions.addWidgetIcon, (state, action) => {
            const {widgetId} = action.payload
            state.selectedObj = {widgetId};
        })
        .addCase(actions.addIconSection, (state, action) => {
            const {sectionId} = action.payload
            state.selectedObj = {sectionId};
        })
});

export const useIsEditor = () => useAppSelector(state => state.editor.isOn);

export default editorSlice;

