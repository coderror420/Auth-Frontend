import { Navigate } from "react-router-dom";
import { getAccessToken, getRefreshToken, storeTokens, clearTokens } from "../utils/auth";
import api from "../utils/api"; 
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (accessToken) {
        setIsAllowed(true);
        setLoading(false);
        return;
      }

      if (refreshToken) {
        try {
          const res = await api.post(
            "/refresh",
            { refreshToken }
          );
          storeTokens(res.data); 
          setIsAllowed(true);
        } catch (err) {
          clearTokens();
          setIsAllowed(false);
        }
      } else {
        setIsAllowed(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-600">Checking authentication...</div>;

  return isAllowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
