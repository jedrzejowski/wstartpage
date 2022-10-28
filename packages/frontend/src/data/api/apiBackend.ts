import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IconCollectionT} from '../../types';
import {BACKEND_URL} from '../fetch';
import qs from 'qs';

export const iconCollectionsApi = createApi({
  reducerPath: 'apiBackend',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}api`
  }),
  endpoints: (builder) => ({
    getIconCollection: builder.query<IconCollectionT, string>({
      query: (name) => `/icon-collections/${name}`,
    }),
    getMergedIconCollection: builder.query<IconCollectionT, string>({
      query: (name) => `/icon-collections/${name}?${qs.stringify({recursiveMerge: true})}`,
    }),
    getIconCollectionList: builder.query<string[], undefined>({
      query: () => `/icon-collections`,
    }),
  }),
});

export const {
  useGetIconCollectionQuery,
  useGetMergedIconCollectionQuery,
  useGetIconCollectionListQuery,
} = iconCollectionsApi;


