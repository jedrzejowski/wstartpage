export type DashboardWidgetT = {
    title?: string;
    icon?: string;
    url: string;
    order?: number;
}

export type DashboardSectionT = {
    title: string;
    width?: number;
    widgets: DashboardWidgetT[];
    order?: number;
}

export type DashboardContainerT = DashboardSectionT[];

export type DashboardContainersT =
    | "top"
    | "middle"
    | "left"
    | "right"
    | "bottom";

export  type DashboardSourceT = Partial<Record<DashboardContainersT, DashboardContainerT | null>>;

export type DashboardStyleT = {
    logo: string;
}

export function mergeDashboards(dashboards: DashboardSourceT[]) {

    function reduce(name: DashboardContainersT): DashboardSectionT[] {
        return dashboards.reduce((sum, cur) => {
            return (cur[name] ? [...sum, ...cur[name]] : sum);
        }, [] as DashboardSectionT[]).sort((a, b) => {
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
