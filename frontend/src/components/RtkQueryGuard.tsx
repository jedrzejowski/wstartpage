import type {ReactElement, ReactNode} from 'react';
import type {UseQueryHookResult} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import type {QueryDefinition} from '@reduxjs/toolkit/query';

function RtkQueryGuard<T>(props: {
  query: UseQueryHookResult<QueryDefinition<any, any, any, T>, any>
  children: (data: T) => ReactNode;
  strict?: boolean;
}): ReactElement | null {
  const {query, children} = props;

  if (query.isLoading || query.isFetching) {
    // TODO
    return null;
  }

  if (query.isError) {
    // TODO
    return null;
  }

  if (query.isSuccess) {
    return <>{children(query.data)}</>;
  }

  return null;
}

export default RtkQueryGuard;
