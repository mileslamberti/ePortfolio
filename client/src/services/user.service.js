import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

 //the plan for functions here is to get data from database once logged in. For example getMe 
 //should be used in the profile component to get the personal info of the user (which needs to be auth'd first)

async function getMe() {
  let response = {}
  try{
    response = await axios.get(API_URL + "/user", { headers: authHeader() })
    if (response.data.userData) {
      return response.data.userData.credentials;
    }
  }
  catch (err) {
    return response;
  }
};

async function isUser(checkHandle) {
  try{
    let response = await axios.get(API_URL + "/user", { headers: authHeader() })
    return (response.data.userData.credentials.handle === checkHandle);
  }
  catch (err) {
    try {
      if (err.response.status === 410){
        authService.logout();
  
        // This isn't an ideal solution - better alternative is to...
        // ...switch to async local storage, but that requires many changes.
        setTimeout(function() {
          window.location.href = "/login";
          window.location.reload();
        }, 1000);
      }
      else{
        return false;
      }
    }
    catch (e){
      console.log(e);
    }
  }
  
}

export default {
  getMe,
  isUser,
};
