import type {IconCollectionT} from '../types';
import {useQuery, UseQueryResult} from 'react-query';
import {backendFetch} from './fetch';

const STORAGE_NAME = 'icon_sets';

export function useIconCollectionList() {
  return useQuery([STORAGE_NAME], () => fetchIconCollectionList());
}

export function useIconCollection(name: string): UseQueryResult<IconCollectionT>;
export function useIconCollection(name: null): UseQueryResult<null>;
export function useIconCollection(name: string | null): UseQueryResult<IconCollectionT | null> {
  const queryState = useQuery([STORAGE_NAME, name], () => {
    if (!name) return null;
    return fetchIconCollection(name);
  });

  // useEffect(() => {
  //     queryState.refetch().then();
  // }, [name]);

  return queryState;
}

export function fetchIconCollection(id: string): Promise<IconCollectionT> {
  return backendFetch<IconCollectionT>(`/api/icon-collections/${id}`);
}

export function fetchIconCollectionUpdate(id: string, iconCollection: IconCollectionT) {
  return backendFetch<IconCollectionT>(`/api/icon-collections/${id}`, iconCollection);
}

export function fetchIconCollectionList() {
  return backendFetch<string[]>(`/api/icon-collections`);
}
