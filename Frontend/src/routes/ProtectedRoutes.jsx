import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  const { isAuth, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await checkAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuth) {
      // Redireccionar al usuario a la página a la que intentaba acceder antes de ser redirigido al inicio de sesión.
      navigate("/login", { state: { from: window.location.pathname } });
    }
  }, [isAuth, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    // Redireccionar al usuario a la página a la que intentaba acceder antes de ser redirigido al inicio de sesión.
    navigate("/login", { state: { from: window.location.pathname } });
    return null;
  }

  return <Outlet />;
};
