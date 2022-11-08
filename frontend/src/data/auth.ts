import {useGetSessionQuery} from './api/apiBackend';

export interface UserDataT {
  username: string;
}

export function useAuth(): UserDataT | 'loading' | null {
  const query = useGetSessionQuery();

  if (query.isLoading) {
    return 'loading';
  }

  if (!query.isSuccess) {
    return null;
  }

  return query.data;
}
