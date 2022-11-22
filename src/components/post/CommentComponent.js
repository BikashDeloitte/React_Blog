import { React, useEffect, useState } from "react";
import { getCommentByPostBy } from "../../service/CommentService";

const CommentComponent = (props) => {
  const [comment, setComment] = useState([]);

  //get all comment of particular post
  const getPostComment = async (postId) => {
    const data = await getCommentByPostBy(postId);
    setComment(data);
  };

  //trigger at load of this component
  useEffect(() => {
    getPostComment(props.postId);
  }, []);

  return (
    <div>
      {console.log("jhhhh", comment.length)}
      <h4 className="mt-4">Comments ({comment.length})</h4>
      {comment.map((c) => {
        return (
          <p key={c.id} className="mt-4">
            <strong>{c.userName}</strong>{" "}
            <small style={{ color: "grey" }}> {c.commentDate}</small>
            <br />
            <small>{c.comment}</small>
          </p>
        );
      })}
    </div>
  );
};

export default CommentComponent;
