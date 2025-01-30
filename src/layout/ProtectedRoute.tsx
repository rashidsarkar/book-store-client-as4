import React, { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);

  const tokenRes = verifyToken(token);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
