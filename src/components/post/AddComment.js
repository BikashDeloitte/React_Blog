import { React, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "reactstrap";
import { isLoggedIn } from "../../auth/UserDataAuth";
import { createComment } from "../../service/CommentService";

const AddComment = (props) => {
  const [comment, setComment] = useState("");

  const onSubmit = () => {
    if (!isLoggedIn()) {
      toast.warn("for comment please login");
    }

    createComment(comment, props.postId);
  };

  return (
    <div>
      <Input
        type="textarea"
        placeholder="Add comment ..."
        onChange={(newComment) => setComment(newComment)}
      />
      <Button className="mt-2" onClick={() => onSubmit()}>
        Submit
      </Button>
    </div>
  );
};

export default AddComment;
