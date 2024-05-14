import {useGetCurrentUserQuery} from "../data/slice/apiSlice.ts";
import {Navigate, useLocation} from "react-router-dom";
import {FC, ReactNode} from "react";

const RequireAuth: FC<{ children: ReactNode }> = (props) => {
  const query = useGetCurrentUserQuery();
  const location = useLocation();

  if (query.isLoading) return null;

  if (query.isError) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  return <>{props.children}</>;
};

export default RequireAuth
