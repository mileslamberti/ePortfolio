import authService from "./auth.service";

export default async function authHeader() {
  try{
    let token = await authService.getCurrentUser();

    if (token) {
      return ({ Authorization: `Bearer ${token}` });
    } else {
      return {};
    }
  }
  catch (e){
    console.log(e);
    return {};
  }
}