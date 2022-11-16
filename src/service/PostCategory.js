import { myAxios } from "./helper";

export const PostCategory = () => {
  return myAxios.get("/category").then((response) => response.data);
};

export const Post = (postData) => {
  return myAxios.post("/post", postData).then((response) => response.data);
};
