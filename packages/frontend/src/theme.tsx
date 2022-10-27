import React, {FC, ReactNode, useEffect, useState} from 'react';
import {DefaultTheme, ThemeProvider as LibThemeProvider} from 'styled-components';
import {selectPageSettingsZoomLevel} from './data/slice/pageSettings';
import {useAppSelector} from './data/hooks';

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
      background0: string;
      background1: string;
      border: string;
    },
  }
}

export const defaultTheme: DefaultTheme = {
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
    background0: '#fcfcfc',
    background1: 'white',
    border: '#bbbebf'
  },
};

export const ThemeProvider: FC<{
  children: ReactNode;
}> = (props) => {
  const [theme, setTheme] = useState(defaultTheme);

  const zoomLevel = useAppSelector(selectPageSettingsZoomLevel);

  useEffect(() => {
    const zoomFactor = zoomLevel  / 100;

    setTheme({
      ...theme,
      baseSpacing: defaultTheme.baseSpacing * zoomFactor,
      iconSize: defaultTheme.iconSize * zoomFactor,
      baseFontSize: defaultTheme.baseFontSize * zoomFactor,
      zoomFactor: zoomFactor,
    });

  }, [zoomLevel]);

  useEffect(() => {
    document.body.style.fontSize = theme.baseFontSize + 'px';
  }, [theme.baseFontSize]);

  return <>
    <LibThemeProvider theme={theme}>
      {props.children}
    </LibThemeProvider>
  </>;
};
