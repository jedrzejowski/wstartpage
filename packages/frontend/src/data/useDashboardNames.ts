import {useEffect, useState} from "react";

export function useAvailableDashboardNames(): string[] {
    const [names, setNames] = useState<string[] | null>(null);

    useEffect(() => {
        let canceled = false;
        fetch(`api/dashboardSources`, {
            headers: {
                "Accept": "application/json"
            }
        }).then(async result => {
            if (canceled) {
                return;
            }

            if (!result.ok) {
                setNames(null);
                return;
            }

            const names: string[] = await result.json();

            if (canceled) {
                return;
            }

            setNames(names);
        });

        return () => {
            canceled = true;
        };
    }, []);

    return names;
}

