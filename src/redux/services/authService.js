import axios from "axios";
import { setAuth } from "../../util/setAuth";

const API_URL = process.env.REACT_APP_SERVER_KEY + "api/user/";

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    const { token } = response.data;
    localStorage.setItem("jwt", token);
    setAuth(token);
  }

  return response.data;
};
//register user
// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// Logout user
const logout = () => {
  localStorage.removeItem("jwt");
};

const authService = {
  logout,
  login,
  register,
};

export default authService;
