import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TileCollectionT} from '../tileCollection';
import {BACKEND_URL} from '../fetch';
import qs from 'qs';
import {UserDataT} from '../auth';


export const apiBackend = createApi({
  reducerPath: 'apiBackend',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}api`,
    credentials: 'include',
  }),

  tagTypes: ['session'],

  endpoints: (builder) => ({

    getSession: builder.query<UserDataT, void>({
      query: () => '/session',
      providesTags: ['session']
    }),

    login: builder.mutation<UserDataT, { username: string; password: string; }>({
      query: ({username, password}) => ({
        url: '/session',
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(username + ':' + password)}`
        }
      }),
      invalidatesTags: ['session'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/session',
        method: 'DELETE',
      }),
      invalidatesTags: ['session'],
    }),

    getTileCollection: builder.query<TileCollectionT, string>({
      query: (name) => `/tile-collections/${name}`,
    }),
    getMergedTileCollection: builder.query<TileCollectionT, string>({
      query: (name) => `/tile-collections/${name}?${qs.stringify({recursiveMerge: true})}`,
    }),
    getTileCollectionList: builder.query<string[], undefined>({
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
  useGetSessionQuery,
  useLoginMutation,
  useGetTileCollectionQuery,
  useGetTileCollectionListQuery,
  useGetMergedTileCollectionQuery,
  useUpdateTileCollectionMutation,
} = apiBackend;


