import {DashboardSourceT} from "../types";
import {useEffect, useState} from "react";

export function useNamedIconSet(id: string): DashboardSourceT | null {
    const [dashboardSource, setDashboardSource] = useState<DashboardSourceT | null>(null);

    useEffect(() => {
        let canceled = false;

        fetchIconSets(id).then(async dashboardSource => {

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

export default useNamedIconSet;

export function useNamedIconSets(ids: string[]): DashboardSourceT[] {
    const [dashboardSources, setDashboardSources] = useState<DashboardSourceT[]>([]);

    useEffect(() => {
        let canceled = false;

        Promise.all(ids.map(id => fetchIconSets(id))).then(async dashboardSources => {

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

export async function fetchIconSets(id: string): Promise<DashboardSourceT> {
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
