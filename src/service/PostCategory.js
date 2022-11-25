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
export const getAllPost = async (pageNumber, pageSize) => {
  return await myAxios
    .get(`/post?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then((response) => response.data);
};

//get post by id
export const getPostById = async (postId) => {
  return await myAxios.get(`/post/${postId}`).then((response) => response.data);
};

//upload post image
export const uploadPostImage = (postImage, postId) => {
  let formData = new FormData();
  formData.append("postImage", postImage);
  return privateAxios
    .post(`/upload/${postId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => response.data);
};
