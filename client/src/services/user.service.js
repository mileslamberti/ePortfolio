import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

 //the plan for functions here is to get data from database once logged in. For example getMe 
 //should be used in the profile component to get the personal info of the user (which needs to be auth'd first)

async function getMe() {
  let response = await axios.get(API_URL + "/user", { headers: authHeader() })
    
  if (response.data.userData) {
    console.log(response.data.userData.credentials);
    return response.data.userData.credentials;
  }
  
};

async function isUser(checkHandle) {
  let response = await axios.get(API_URL + "/user", { headers: authHeader() })
  
  console.log(response.data.userData.credentials.handle == checkHandle);
  
  return (response.data.userData.credentials.handle == checkHandle);
  
}

export default {
  getMe,
  isUser,
};
