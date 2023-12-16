import instance from "./setCredentialsAxios.js";

export const registerReq = async (user) => {
  try {
    const response = await instance.post(`/register`, user);
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud de registro:", error);

    if (error.response && error.response.data) {
      console.error("Respuesta del servidor:", error.response.data);
    }
    throw error;
  }
};

export const loginRequest = (user) => {
  console.log("URL base:", instance.defaults.baseURL);
  return instance.post(`/login`, user);
};

export const verifyToken = () => instance.get(`/verifyToken`, { withCredentials: true });

export const logoutRequest = async () => {
try {
  const response = await instance.post(`/logout`);
  return response.data;
} catch (error) {
  console.error("Error en la solicitud de cierre de sesión:", error);
  throw error;
}
};

export const getProfileRequest = async () => {
try {
  const response = await instance.get(`/profile`);
  return response.data;
} catch (error) {
  console.error("Error en la solicitud del perfil:", error);
  throw error;
}
};