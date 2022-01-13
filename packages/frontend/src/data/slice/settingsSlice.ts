import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../hooks";
import {FC, useEffect} from "react";
import {toLocalStorage} from "../../lib/localStorage";

const STORAGE_NAME = "settings";

interface SettingsState {
    logoUrl: string | null;
    backgroundUrl: string | null;
    iconSetNames: string[];
    darkMode: boolean;
    displayTitles: boolean;
    zoomLevel: number;
}

const search_params = new URL(location.href).searchParams;
const default_value: SettingsState = getSettings({
    get: key => search_params.get(key),
    has: key => search_params.has(key),
});

interface SettingsStorageI {
    has(key: string): boolean;

    get(key: string): string | null;
}

function getSettings(storage: SettingsStorageI): SettingsState {
    function getBoolean(key: string, default_: boolean): boolean {
        switch (storage.get(key)) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                return default_;
        }
    }

    function getString(key: string, default_: string | null = null): string | null {
        let value: string | null = storage.get(key) ?? null;
        return typeof value === "string" && value.length > 0 ? value : null;
    }

    const logoUrl = getString("logoUrl");
    const backgroundUrl = getString("backgroundUrl");

    const iconSetNameRegex = /[a-zA-Z0-9]+/;
    const iconSetsStr: any = storage.get("iconSets") ?? "";
    const iconSetNames = (iconSetsStr + "").split(/[,;]/).filter(str => iconSetNameRegex.test(str));

    const darkMode = getBoolean("darkMode", false);

    const displayTitles = !getBoolean("hideTitles", false);

    let zoomLevel = Number.parseInt(storage.get("zoomLevel") ?? "1");
    zoomLevel = isNaN(zoomLevel) ? 100 : zoomLevel;

    return {
        logoUrl,
        backgroundUrl,
        iconSetNames,
        darkMode,
        displayTitles,
        zoomLevel,
    };
}

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
useSettings.backgroundUrl = () => useAppSelector(state => state.settings.backgroundUrl);

export default settingsSlice;

export const SettingsSaver: FC = props => {
    const settings = useAppSelector(state => state.settings);

    useEffect(() => {
        toLocalStorage(STORAGE_NAME, settings);
    }, [settings]);

    return null;
};
