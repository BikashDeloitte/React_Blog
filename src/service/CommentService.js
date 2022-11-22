import { currentUser } from "../auth/UserDataAuth";
import { myAxios, privateAxios } from "./helper";

//create comment on post
export const createComment = (comment, postId) => {
  console.log("good in", comment.target.value);
  const userId = currentUser()?.id;
  console.log(userId);

  return privateAxios
    .post(
      `/comment?postId=${postId}&userId=${userId}&comments=${comment.target.value}`
    )
    .then((resposne) => resposne.data);
};

//get all comment of particular post
export const getCommentByPostBy = async (postId) => {
  return await myAxios
    .get(`/comment?postId=${postId}`)
    .then((response) => response.data);
};
