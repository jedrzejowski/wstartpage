import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";
import {FC, useEffect} from "react";
import {fromLocalStorage, toLocalStorage} from "../../lib/localStorage";

const STORAGE_NAME = "settings";

interface SettingsState {
    iconSetNames: string[];
    darkMode: boolean;
    displayTitles: boolean;
}

const default_value: SettingsState = {
    iconSetNames: [],
    darkMode: false,
    displayTitles: true,
};

const initialState: SettingsState = fromLocalStorage(STORAGE_NAME, default_value);
initialState.iconSetNames = new URL(location.href).searchParams.get("iconSets")?.split(/[,;]/) ?? initialState.iconSetNames;

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setIconSetName(state, action: PayloadAction<string[]>) {
            state.iconSetNames = action.payload;
        },
        setDisplayTitles(state, action: PayloadAction<boolean>) {
            state.displayTitles = action.payload;
        },
    },
});

export const useIconSetNames = () => useAppSelector(state => state.settings.iconSetNames);
export const useDisplayTitles = () => useAppSelector(state => state.settings.displayTitles);

export default settingsSlice;

export const SettingsSaver: FC = props => {
    const settings = useAppSelector(state => state.settings);

    useEffect(() => {
        toLocalStorage(STORAGE_NAME, settings);
    }, [settings]);

    return null;
};
