import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

async function register(email, password, confirmPassword, handle) {

  let response = await axios.post(API_URL + "/signup", {
    email,
    password,
    confirmPassword,
    handle,
  })

  if (response.data) {
    try { 
      await AsyncStorage.setItem("user", response.data.token);
    }
    catch (e){
      console.log(e);
    }
  }
  
  return response;
};

async function login(email, password) {

  let response = await axios.post(API_URL + "/login", {
    email,
    password,
  })

  if (response.data) {
    // User token is stored in local storage, NOTE: this has been upgraded to async storage
    // async storage handles redirecting after clearing properly (for logout and redirect...
    // ...after expiry)
    try {
      await AsyncStorage.setItem('user', response.data.token);
    }
    catch (e){
      console.log(e);
    }
  }
      
  return response.data;
    
};

async function logout() {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    console.log(e);
  }
};

async function getCurrentUser() {
  try {
   return await AsyncStorage.getItem("user");
  }
  catch(e){
    console.log(e);
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
