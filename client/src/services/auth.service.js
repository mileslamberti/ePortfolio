import axios from "../api";
//import userService from "./user.service";

const register = (email, password, confirmPassword, handle) => {
  return axios
    .post("/signup", {
      email,
      password,
      confirmPassword,
      handle,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(localStorage.getItem("user"));
      }
      return response;
    });
};

async function login(email, password) {
  let response = await axios.post("/login", {
    email,
    password,
  });

  if (response.data) {
    //user token is stored in local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
