import type {IconCollection} from "../types";
import {useEffect} from "react";
import {useQuery, UseQueryResult} from "react-query";

const STORAGE_NAME = "icon_sets";

export function useIconCollectionList() {
    return useQuery([STORAGE_NAME], () => fetchIconCollectionList())
}

export function useIconCollection(name: string): UseQueryResult<IconCollection>;
export function useIconCollection(name: null): UseQueryResult<null>;
export function useIconCollection(name: string | null): UseQueryResult<IconCollection | null> {
    const queryState = useQuery([STORAGE_NAME, name], () => {
        if (!name) return null;
        return fetchIconCollection(name)
    })

    useEffect(() => {
        queryState.refetch().then();
    }, [name]);

    return queryState;
}

export async function fetchIconCollection(id: string): Promise<IconCollection> {
    const response = await fetch(`/api/icon-collections/${id}`, {
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("cant fetch dashboard");
    }

    return await response.json();
}

export async function fetchIconCollectionList(): Promise<string[]> {
    const response = await fetch(`/api/icon-collections`, {
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
