import React, {FC, ReactNode, useEffect, useState} from 'react';
import {createGlobalStyle, DefaultTheme, ThemeProvider as LibThemeProvider} from 'styled-components';
import {selectPageSettingsZoomLevel} from './data/slice/pageSettings';
import {useAppSelector} from './data/hooks';

declare module 'styled-components' {
  interface DefaultTheme {

    baseSpacing: number;
    baseFontSize: number;

    spacing(num?: number): string;

    spacing(vertical: number, horizontal: number): string;

    spacing(top: number, side: number, bottom: number): string;

    spacing(top: number, right: number, bottom: number, left: number): string;

    spacingNum(num?: number): number;

    selectedOutline(): string;

    iconSize: number;
    zoomFactor: number;

    color: {
      bodyBackground: string;
      background: string;
      text: string;
      border: string;
      hover: string;
      selected: string;
    },

    shadow(size?: number): string;
  }
}

const lightTheme: DefaultTheme = {
  baseSpacing: 6,
  baseFontSize: 16,

  spacingNum(num = 1) {
    return num * this.baseSpacing;
  },
  spacing(num1?: number, num2?: number, num3?: number, num4?: number) {
    if (num1 === undefined) {
      return this.spacingNum() + 'px';
    }

    if (num2 === undefined) {
      return this.spacingNum(num1) + 'px';
    }

    if (num3 === undefined) {
      return this.spacingNum(num1) + 'px ' + this.spacingNum(num2) + 'px';
    }

    if (num4 === undefined) {
      return this.spacingNum(num1) + 'px ' + this.spacingNum(num2) + 'px ' + this.spacingNum(num3) + 'px';
    }

    return this.spacingNum(num1) + 'px ' + this.spacingNum(num2) + 'px ' +
      this.spacingNum(num3) + 'px ' + this.spacingNum(num4) + 'px ';
  },
  selectedOutline() {
    return [
      `outline: 1px solid rgb(0 102 255 / 55%);`,
      `outline-offset: 6px`,
    ].join('');
  },
  iconSize: 64,
  zoomFactor: 1,

  color: {
    bodyBackground: 'rgb(252, 252, 252)',
    background: 'white',
    text: '#000',
    border: '#bbbebf',
    hover: 'rgb(0,0,0,0.12)',
    selected: 'rgb(0,0,0,0.25)',
  },

  shadow(size?: number): string {
    return '0px 1px 2px black';
  }
};

const darkTheme: DefaultTheme = {
  ...lightTheme,
  color: {
    bodyBackground: 'black',
    background: '#222222',
    text: '#FFF',
    border: '#bbbebf',
    hover: 'rgb(0,0,0,0.12)',
    selected: 'rgb(0,0,0,0.25)',
  },
}

const GlobalStyle = createGlobalStyle<{}>`
  body {
    margin: 0;
    color: ${props => props.theme.color.text};
    font-family: sans-serif;

    background-attachment: fixed;
    background-color: ${props => props.theme.color.bodyBackground};
    background-position: 0 0;
  }

  body::-webkit-scrollbar {
    display: none;
  }
`;

export const ThemeProvider: FC<{
  children: ReactNode;
}> = (props) => {
  const [theme, setTheme] = useState(lightTheme);

  const zoomLevel = useAppSelector(selectPageSettingsZoomLevel);

  useEffect(() => {
    const zoomFactor = zoomLevel / 100;

    setTheme({
      ...theme,
      baseSpacing: lightTheme.baseSpacing * zoomFactor,
      iconSize: lightTheme.iconSize * zoomFactor,
      baseFontSize: lightTheme.baseFontSize * zoomFactor,
      zoomFactor: zoomFactor,
    });

  }, [zoomLevel]);

  useEffect(() => {
    document.body.style.fontSize = theme.baseFontSize + 'px';
  }, [theme.baseFontSize]);

  return <>
    <LibThemeProvider theme={theme}>
      <GlobalStyle/>
      {props.children}
    </LibThemeProvider>
  </>;
};
