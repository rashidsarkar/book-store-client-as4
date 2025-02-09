import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
type TProtectedRoute = {
  children: ReactNode;
};

export default function ProtectedRouteOnlyLogin({ children }: TProtectedRoute) {
  const token = useAppSelector((state) => state.auth.token);

  // console.log(user);
  // const tokenRes = verifyToken(token);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
