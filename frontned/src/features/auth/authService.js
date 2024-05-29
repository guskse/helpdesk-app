import axios from "axios";

const API_URL = "/api/users/";

//register USER
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    //save the user credentials in the localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login USER
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    //save the user credentials in the localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout USER
const logout = () => {
  //delete user credentials from localStorage
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
