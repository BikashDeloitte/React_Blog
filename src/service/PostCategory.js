import { myAxios } from "./helper";

export const PostCategory = () => {
  return myAxios.get("/category").then((response) => response.data);
};
