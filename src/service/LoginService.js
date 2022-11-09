import { myAxios } from "./helper";

export const LoginService = (loginData) => {
  return myAxios.post("/token", loginData).then((response) => response.data);
};
