import { myAxios, privateAxios } from "./helper";

export const PostCategory = () => {
  return myAxios.get("/category").then((response) => response.data);
};

export const Post = (postData) => {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/post`,
      postData
    )
    .then((response) => response.data);
};
