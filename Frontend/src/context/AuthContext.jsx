import { createContext, useContext, useEffect, useState } from "react";
import { registerReq, loginRequest, verifyToken } from "../api/user";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error en el contexto del usuario");
  return context;
};

const useCookieHandler = () => {
  const handleCookie = (key, value) => {
    if (value) {
      Cookies.set(key, value);
    } else {
      Cookies.remove(key);
    }
  };

  return { handleCookie };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);

  const { handleCookie } = useCookieHandler();

  const handleErrors = (error) => {
    setErrors(error.response.data);
  };

  const checkAuth = async () => {
    try {
      const res = await verifyToken();
      if (res.data) {
        // El token es válido, el usuario está autenticado
        setIsAuth(true);
        setUser(res.data);
      } else {
        // El token no es válido o no existe
        setIsAuth(false);
        setUser(null);
      }
    } catch (error) {
      // Ocurrió un error al verificar el token
      setIsAuth(false);
      setUser(null);
    }
  };

  const signup = async (user) => {
    try {
      const res = await registerReq(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      handleErrors(error);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      handleErrors(error);
    }
  };

  const signout = () => {
    handleCookie("token");
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function verifyLogin() {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const res = await verifyToken(cookies.token);
          if (res.data) {
            setIsAuth(true);
            setUser(res.data);
          } else {
            setIsAuth(false);
          }
        } catch (error) {
          setIsAuth(false);
          setUser(null);
        }
      }
    }
    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, signout, user, isAuth, errors, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
  
};
