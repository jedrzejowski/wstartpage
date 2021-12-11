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
