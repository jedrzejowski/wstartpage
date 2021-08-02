import {DashboardSourceT} from "../types";
import {useEffect, useState} from "react";
import {List} from "immutable";

export function useNamedDashboard(id: string): DashboardSourceT | null {
    const [dashboardSource, setDashboardSource] = useState<DashboardSourceT | null>(null);

    useEffect(() => {
        let canceled = false;

        fetchDashboard(id).then(async dashboardSource => {

            if (canceled) {
                return;
            }

            setDashboardSource(dashboardSource);
        });

        return () => {
            canceled = true;
        };
    }, [id]);

    return dashboardSource;
}

export default useNamedDashboard;

export function useNamedDashboards(ids: string[] | List<string>): DashboardSourceT[] {
    const [dashboardSources, setDashboardSources] = useState<DashboardSourceT[]>([]);

    useEffect(() => {
        let canceled = false;

        Promise.all(ids.map(id => fetchDashboard(id))).then(async dashboardSources => {

            if (canceled) {
                return;
            }

            setDashboardSources(dashboardSources);
        });

        return () => {
            canceled = true;
        };
    }, [ids.join(";")]);

    return dashboardSources;
}

export async function fetchDashboard(id: string): Promise<DashboardSourceT> {
    const response = await fetch(`api/dashboardSources/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("cant fetch dashboard");
    }

    return await response.json();
}
