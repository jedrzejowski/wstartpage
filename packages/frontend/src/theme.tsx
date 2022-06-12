import {createGlobalStyle, DefaultTheme, ThemeProvider as LibThemeProvider} from 'styled-components';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useSettings} from './data/slice/settingsSlice';
import {joinUrls} from '@reduxjs/toolkit/dist/query/utils';

declare module 'styled-components' {
  interface DefaultTheme {

    baseSpacing: number;
    baseFontSize: number;

    spacing(num?: number): string;

    spacing4(top: number, right: number, bottom: number, left: number): string;

    spacingNum(num?: number): number;

    selectedOutline(): string;

    iconSize: number;
    buttonHoverBg: string;
    zoomFactor: number;

    color: {
      border: string;
    },
  }
}

export const default_theme: DefaultTheme = {
  baseSpacing: 6,
  baseFontSize: 16,

  spacingNum(num = 1) {
    return num * this.baseSpacing;
  },
  spacing(num = 1) {
    return this.spacingNum(num) + 'px';
  },
  spacing4(top, right, bottom, left) {
    return [
      this.spacing(top),
      this.spacing(right),
      this.spacing(bottom),
      this.spacing(left),
    ].join(' ');
  },
  selectedOutline() {
    return [
      `outline: 1px solid rgb(0 102 255 / 55%);`,
      `outline-offset: 6px`,
    ].join('');
  },
  iconSize: 64,
  buttonHoverBg: '#bbbebf',
  zoomFactor: 1,

  color: {
    border: '#bbbebf'
  },
};

export const ThemeProvider: FC<{
  children: ReactNode;
}> = (props) => {
  const [theme, setTheme] = useState(default_theme);

  const zoom_level = useSettings.zoomLevel();

  useEffect(() => {
    const zoomFactor = zoom_level / 100;

    setTheme({
      ...theme,
      baseSpacing: default_theme.baseSpacing * zoomFactor,
      iconSize: default_theme.iconSize * zoomFactor,
      baseFontSize: default_theme.baseFontSize * zoomFactor,
      zoomFactor: zoomFactor,
    });

  }, [zoom_level]);

  useEffect(() => {
    document.body.style.fontSize = theme.baseFontSize + 'px';
  }, [theme.baseFontSize]);

  return <>
    <LibThemeProvider theme={theme}>
      {props.children}
    </LibThemeProvider>
  </>;
};
