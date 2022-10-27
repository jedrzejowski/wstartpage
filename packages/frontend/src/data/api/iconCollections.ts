import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IconCollectionT} from '../../types';
import {BACKEND_URL} from '../fetch';
import qs from 'qs';

export const iconCollectionsApi = createApi({
  reducerPath: 'apiIconCollections',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}api`
  }),
  endpoints: (builder) => ({
    getViewerIconCollection: builder.query<IconCollectionT, string>({
      query: (name) => `/icon-collections/${name}?${qs.stringify({recursiveMerge: true})}`,
    }),
  }),
});

export const {
  useGetViewerIconCollectionQuery
} = iconCollectionsApi;


