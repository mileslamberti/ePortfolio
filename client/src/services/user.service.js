import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9000/user/";

 //the plan for functions here is to get data from database once logged in. For example getMe 
 //should be used in the profile component to get the personal info of the user (which needs to be auth'd first)

const getMe = () => {
  return axios
    .get(API_URL + "me", { headers: authHeader() })//not functioning yet
    .then((response) => {
      if (response) {
        console.log(response);
      }

      return response;
    });
};


export default {
  getMe,
};
