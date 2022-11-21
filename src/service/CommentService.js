import { currentUser } from "../auth/UserDataAuth";
import { myAxios, privateAxios } from "./helper";

//create comment on post
export const createComment = (comment, postId = 1, userId = 1) => {
  console.log("good in", comment.target.value);
  // const [user] = currentUser();
  // console.log("comment user -- ", user);

  return privateAxios
    .post(
      `/comment?postId=${postId}&userId=${userId}&comments=${comment.target.value}`
    )
    .then((resposne) => resposne.data);
};

//get all comment of particular post
export const getCommentByPostBy = (postId) => {
  return myAxios
    .get(`/comment?postId=${postId}`)
    .then((response) => response.data);
};
