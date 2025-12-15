import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  // ⏳ Wait until auth state is restored
  if (loading) return null; // or loader/spinner

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
