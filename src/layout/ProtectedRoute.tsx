import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
type TProtectedRoute = {
  children: ReactNode;
  role: string;
};

export default function ProtectedRoute({ children, role }: TProtectedRoute) {
  const token = useAppSelector((state) => state.auth.token);

  // const tokenRes = verifyToken(token);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
