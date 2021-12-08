import {createGlobalStyle, DefaultTheme, ThemeProvider as LibThemeProvider} from "styled-components";
import React, {FC, useEffect, useState} from "react";
import {useSettings} from "./data/slice/settingsSlice";

declare module 'styled-components' {
    interface DefaultTheme {

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

export const default_theme: DefaultTheme = {
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

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
    body {
        margin: 0;
        color: black;
        font-family: sans-serif;
    
        background-attachment: fixed;
        background-color: #fcfcfc;
        background-position: 0 0;
    }
    
    #app {
    }
    
    body::-webkit-scrollbar {
        display: none;
    }
`;
document.head.append(globalStyles);

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

    return <>
        <LibThemeProvider theme={theme}>
            {props.children}
        </LibThemeProvider>
    </>
}
