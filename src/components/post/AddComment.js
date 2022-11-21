import { React, useState } from "react";
import { Button, Input } from "reactstrap";
import { createComment } from "../../service/CommentService";

const AddComment = (props) => {
  const [comment, setComment] = useState({});

  const onSubmit = () => {
    console.log("hahahahahaahahhaha", props.postId);
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
