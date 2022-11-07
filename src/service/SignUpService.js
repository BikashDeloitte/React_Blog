import { myAxios } from "./helper";

export const SignUpService = (userData) => {
  //sending user registration data to api
  return myAxios.post("/userdata", userData).then((response) => response.data);
};
