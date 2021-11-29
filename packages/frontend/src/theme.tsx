import {Theme, ThemeProvider as LibThemeProvider} from "@emotion/react";
import React, {FC, useEffect, useState} from "react";
import {useSettings} from "./data/slice/settingsSlice";

declare module '@emotion/react' {
    interface Theme {

        baseSpacing: number;
        baseFontSize: number;

        spacing(num?: number): string;

        spacingNum(num?: number): number;

        iconSize: number;
        buttonHoverBg: string;

        color: {
            border: string;
        }
    }
}

export const default_theme: Theme = {
    baseSpacing: 6,
    baseFontSize: 16,

    spacingNum(num = 1) {
        return num * this.baseSpacing;
    },
    spacing(num = 1) {
        return this.spacingNum(num) + "px";
    },
    iconSize: 64,
    buttonHoverBg: "#bbbebf",

    color: {
        border: "#bbbebf"
    }
}

export const ThemeProvider: FC = (props) => {
    const [theme, setTheme] = useState(default_theme);

    const zoom_level = useSettings.zoomLevel();

    useEffect(() => {

        setTheme({
            ...theme,
            baseSpacing: default_theme.baseSpacing * zoom_level / 100,
            iconSize: default_theme.iconSize * zoom_level / 100,
            baseFontSize: default_theme.baseFontSize * zoom_level / 100,
        });

    }, [zoom_level]);

    useEffect(() => {
        document.body.style.fontSize = theme.baseFontSize + "px";
    }, [theme.baseFontSize]);

    return (
        <LibThemeProvider theme={theme}>
            {props.children}
        </LibThemeProvider>
    )
}
