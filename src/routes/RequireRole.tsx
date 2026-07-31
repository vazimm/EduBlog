import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RequireRole({ role }: { role: "professor" }) {
  const { user } = useAuth();

  if (user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
