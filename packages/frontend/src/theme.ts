import {Theme} from "@emotion/react";

declare module '@emotion/react' {
    interface Theme {

        spacing(num?: number): string;

        spacingNum(num?: number): number;

        iconSize: number;
        buttonHoverBg: string;

        color: {
            border: string;
        }
    }
}

const theme: Theme = {
    spacingNum(num = 1) {
        return num * 6;
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

export default theme;
