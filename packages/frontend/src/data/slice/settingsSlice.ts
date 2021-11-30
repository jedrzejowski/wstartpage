import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";
import {FC, useEffect} from "react";
import {toLocalStorage} from "../../lib/localStorage";

const STORAGE_NAME = "settings";

interface SettingsState {
    logoUrl: string | null;
    iconSetNames: string[];
    darkMode: boolean;
    displayTitles: boolean;
    zoomLevel: number;
}

const search_params = new URL(location.href).searchParams;
const default_value: SettingsState = {
    logoUrl: search_params.get("logoUrl") ?? null,
    iconSetNames: search_params.get("iconSets")?.split(/[,;]/) ?? [],
    darkMode: search_params.has("darkMode"),
    displayTitles: !search_params.has("hideTitles"),
    zoomLevel: 100,
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState: default_value,
    reducers: {
        setIconSetName(state, action: PayloadAction<string[]>) {
            state.iconSetNames = action.payload;
        },
        setDisplayTitles(state, action: PayloadAction<boolean>) {
            state.displayTitles = action.payload;
        },
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload;
        },
        setZoomLevel(state, action: PayloadAction<number>) {
            state.zoomLevel = action.payload;
        },
    },
});

export const useSettings = () => useAppSelector(state => state.settings);
useSettings.iconSetNames = () => useAppSelector(state => state.settings.iconSetNames);
useSettings.displayTitles = () => useAppSelector(state => state.settings.displayTitles);
useSettings.logoUrl = () => useAppSelector(state => state.settings.logoUrl);
useSettings.zoomLevel = () => useAppSelector(state => state.settings.zoomLevel);
useSettings.zoomRatio = () => useAppSelector(state => state.settings.zoomLevel / 100);

export default settingsSlice;

export const SettingsSaver: FC = props => {
    const settings = useAppSelector(state => state.settings);

    useEffect(() => {
        toLocalStorage(STORAGE_NAME, settings);
    }, [settings]);

    return null;
};
