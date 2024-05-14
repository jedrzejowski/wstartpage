import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TileCollectionT} from '../tileCollection.ts';
import {BACKEND_URL} from '../fetch.ts';
import qs from 'qs';
import {UserDataT} from './auth.ts';
import {AppRootState} from '../redux.ts';


export const apiSlice = createApi({
  reducerPath: 'apiBackend',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}api`,
    credentials: 'include',
    prepareHeaders(headers, api) {
      const state = api.getState() as AppRootState;
      const credentials = state.auth.credentials;
      if (credentials) {
        headers.set('Authorization', `Basic ${btoa(credentials.username + ':' + credentials.password)}`);
      }
    }
  }),

  tagTypes: ['session'],

  endpoints: (builder) => ({

    login: builder.mutation<UserDataT, { username: string; password: string; }>({
      query: ({username, password}) => ({
        url: '/users/me',
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(username + ':' + password)}`
        },
      }),
      invalidatesTags: ['session'],
    }),

    getCurrentUser: builder.query<UserDataT, void>({
      query: () => '/users/me',
      providesTags: ['session']
    }),

    getTileCollection: builder.query<TileCollectionT, string>({
      query: (name) => `/tile-collections/${name}`,
    }),
    getMergedTileCollection: builder.query<TileCollectionT, string>({
      query: (name) => `/tile-collections/${name}?${qs.stringify({recursiveMerge: true})}`,
    }),
    getTileCollectionList: builder.query<string[], void>({
      query: () => `/tile-collections`,
    }),
    updateTileCollection: builder.mutation<TileCollectionT, TileCollectionT>({
      query: (tileCollection) => ({
        url: `/tile-collections/${tileCollection.name}`,
        method: 'PUT',
        body: tileCollection,
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useGetTileCollectionQuery,
  useGetTileCollectionListQuery,
  useGetMergedTileCollectionQuery,
  useUpdateTileCollectionMutation,
} = apiSlice;


