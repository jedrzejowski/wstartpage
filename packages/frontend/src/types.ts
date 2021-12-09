export type IconT = {
    title?: string;
    icon?: string;
    url: string;
    order?: number;
}

export type IconSectionT = {
    title: string;
    width?: number;
    widgets: IconT[];
    order?: number;
}

export type IconContainerT = IconSectionT[];

export type IconContainersT =
    | "top"
    | "middle"
    | "left"
    | "right"
    | "bottom";

export  type IconCollection = Partial<{
    includes: string[];
} & Record<IconContainersT, IconContainerT | null>>;

export function mergeIconCollections(iconSets: IconCollection[]): IconCollection {

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
