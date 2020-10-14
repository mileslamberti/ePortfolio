import axios from "axios";
//import userService from "./user.service";

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const register = (email, password, confirmPassword, handle) => {
  return axios.post(API_URL + "/signup", {
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
  
  let response = await axios.post(API_URL + "/login", {
      email,
      password,
    })

  if (response.data) {
    //user token is stored in local storage
    localStorage.setItem("user", JSON.stringify(response.data));
    
  }
      
  return response.data;
    
};

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
