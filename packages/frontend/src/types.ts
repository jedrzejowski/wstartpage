type Normalize<T, K extends keyof T> = Omit<T, K> & { [k in K]: number[] };

export const isProduction = process.env.NODE_ENV === 'production';

export type UrlIconT = string;

export function isUrlIconT(icon: AnyIconT | undefined): icon is UrlIconT {
    return typeof icon === "string";
}

export type TextIconT = {
    text: string;
    bgColor: string;
    fontSize: string;
};

export function isTextIconT(icon: AnyIconT | undefined): icon is TextIconT {
    return typeof icon === "object";
}


export type AnyIconT = UrlIconT | TextIconT;

export type IconWidgetT = {
    title: string;
    icon?: AnyIconT;
    url: string;
    order?: number;
}

export type IconSectionT = {
    title: string;
    width?: number;
    widgets: IconWidgetT[];
    order?: number;
}

export type NormalizedIconSectionT = Normalize<IconSectionT, "widgets">;

export type IconContainerT = IconSectionT[];

export type IconContainersT =
    | "top"
    | "middle"
    | "left"
    | "right"
    | "bottom";

export  type IconCollectionT = {
    includes: string[] | null;
    settings: IconCollectionSettingsT | null,
} & Record<IconContainersT, IconContainerT | null>;

export interface IconCollectionSettingsT {
    logoUrl: string | null;
    backgroundUrl: string | null;
    darkMode: boolean;
    displayTitles: boolean;
    zoomLevel: number;
}


export type NormalizedIconCollectionT = Normalize<IconCollectionT, IconContainersT>;

export function mergeIconCollections(iconSets: IconCollectionT[]): IconCollectionT {

    function reduce(name: IconContainersT): IconSectionT[] {
        return iconSets.reduce((sum, cur) => {
            // @ts-ignore
            return (cur[name] ? [...sum, ...cur[name]] : sum);
        }, [] as IconSectionT[]).sort((a, b) => {
            return (a.order ?? 1000) - (b.order ?? 1000);
        });
    }

    return {
        top: reduce("top"),
        left: reduce("left"),
        right: reduce("right"),
        bottom: reduce("bottom"),
        middle: reduce("middle"),
    }
}

export function textIconFromStr(iconText: string): TextIconT {
    const data: any = {};
    iconText = iconText.substring(1);
    const params = new URLSearchParams(iconText);
    for (let [key, value] of params) {
        data[key] = value;
    }

    return {
        text: data.text ?? "",
        bgColor: data.bgColor ?? "",
        fontSize: data.fontSize ?? "",
    };
}

export function textIconToStr(iconText: TextIconT): string {
    return "!" + new URLSearchParams(iconText).toString();
}
