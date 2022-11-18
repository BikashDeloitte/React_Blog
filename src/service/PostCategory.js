import { myAxios, privateAxios } from "./helper";

//to get post category
export const PostCategory = () => {
  return myAxios.get("/category").then((response) => response.data);
};

//store(create) in database
export const CreatePost = (postData) => {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/post`,
      postData
    )
    .then((response) => response.data);
};

//getting all post asynchronously
export const getAllPost = async (userId, pageNumber, pageSize) => {
  console.log(pageNumber, " ", pageSize);
  return await privateAxios
    .get(`/user/${userId}/post?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data);
};
