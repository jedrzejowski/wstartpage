import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";
import {fromStorage} from "../storage";
import {FC, useEffect} from "react";

interface SettingsState {
    iconSetNames: string[];
    darkMode: boolean;
    displayTitles: boolean;
}

const initialState: SettingsState = fromStorage("settings", {
    iconSetNames: [],
    darkMode: false,
    displayTitles: true,
});

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
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    return null;
};
