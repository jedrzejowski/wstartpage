type Normalize<T, K extends keyof T> = Omit<T, K> & { [k in K]: number[] };

export type IconWidgetT = {
    title: string;
    icon?: string;
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

export  type IconCollectionT = Partial<{
    includes: string[];
} & Record<IconContainersT, IconContainerT | null>>;

export type NormalizedIconCollectionT = Normalize<IconCollectionT, IconContainersT>;

export function mergeIconCollections(iconSets: IconCollectionT[]): IconCollectionT {

    function reduce(name: IconContainersT): IconSectionT[] {
        return iconSets.reduce((sum, cur) => {
            return (name in cur ? [...sum, ...cur[name]] : sum);
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


export type TextIconT = {
    text: string;
    bgColor: string;
    fontSize: string;
};

export function textIconFromStr(iconText: string): TextIconT {
    const data: any = {};
    iconText = iconText.substring(1);
    const params = new URLSearchParams(iconText);
    for (let [key, value] of params) {
        data[key] = value;
    }
    return data;
}

export function textIconToStr(iconText: TextIconT): string {
    return "!" + new URLSearchParams(iconText).toString();
}
