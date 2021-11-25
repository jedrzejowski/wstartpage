import {IconSetT} from "../types";
import {useEffect, useState} from "react";
import {fromLocalStorage, toLocalStorage} from "../lib/localStorage";

const STORAGE_NAME = "icon_sets";

export function useIconSet(id: string): IconSetT | null {
    const [icon_set, setIconSet] = useState<IconSetT | null>(null);

    useEffect(() => {
        let canceled = false;

        fetchIconSet(id).then(async icon_set => {

            if (canceled) {
                return;
            }

            setIconSet(icon_set);
        });

        return () => {
            canceled = true;
        };
    }, [id]);

    return icon_set;
}

export function useIconSets(
    ids: string[],
    options: {
        recursive?: boolean;
    } = {},
): IconSetT[] {
    const [icon_sets, setIconSets] = useState<IconSetT[]>([]);

    useEffect(() => {
        setIconSets(fromLocalStorage<IconSetT[]>(STORAGE_NAME, []));

        let canceled = false;

        const icon_sets: IconSetT[] = [];
        const loaded = new Set<string>();
        const loading = new Set<string>();

        function load(id: string) {
            if (loaded.has(id)) {
                return;
            }

            loading.add(id);

            fetchIconSet(id).then(icon_set => {
                icon_sets.push(icon_set);

                if (options.recursive) {
                    icon_set.includes?.forEach(load);
                }
            }).finally(() => {
                loaded.add(id);
                loading.delete(id);

                if (loading.size === 0) {
                    toLocalStorage(STORAGE_NAME, icon_sets);
                    setIconSets(icon_sets);
                }
            });
        }

        ids.forEach(load);

        return () => {
            canceled = true;
        };
    }, [ids.join(";")]);

    return icon_sets;
}

export async function fetchIconSet(id: string): Promise<IconSetT> {
    const response = await fetch(`api/icon-sets/${id}`, {
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
