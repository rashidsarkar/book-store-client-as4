import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { logOut, TUser } from "../redux/features/auth/authSlice";
type TProtectedRoute = {
  children: ReactNode;
  role: string;
};

export default function ProtectedRoute({ children, role }: TProtectedRoute) {
  const token = useAppSelector((state) => state.auth.token);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const dispatch = useAppDispatch();
  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }
  // console.log(user);
  // const tokenRes = verifyToken(token);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
