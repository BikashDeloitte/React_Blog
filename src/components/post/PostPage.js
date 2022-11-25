import { useEffect, React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { isLoggedIn } from "../../auth/UserDataAuth";
import {
  createComment,
  getCommentByPostBy,
} from "../../service/CommentService";
import { BASE_URL } from "../../service/helper";
import { getPostById } from "../../service/PostCategory";

const PostPage = () => {
  //to get post id for url and {} in variable as it is store dynamically
  const { postId } = useParams();

  //store post content data
  const [post, setPost] = useState({});
  //store particular post comment
  const [comment, setComment] = useState([]);
  //link for image
  const postImage = `${BASE_URL}/post/${postId}/image`;

  const [addComment, setAddComment] = useState({
    content: "",
  });

  //get post context through api
  const postData = async () => {
    const data = await getPostById(postId);
    setPost(data);
  };

  //get all comment of particular post
  const getPostComment = async (postId) => {
    const data = await getCommentByPostBy(postId);
    setComment(data);
  };

  /**
   * adding comment only if user is login
   * and we are adding the new comment to existing array of comment
   */
  async function onSubmit() {
    //login warning message
    if (!isLoggedIn()) {
      toast.warn("for comment please login");
    }

    //sending comment to database
    const data = await createComment(addComment.content, postId);

    //we are adding the new comment to existing array of comment
    setComment([...comment, data]);
    restComment();
  }

  //rest comment
  const restComment = () => {
    setAddComment({
      content: "",
    });
  };

  //trigger at load of this component
  useEffect(() => {
    getPostComment(postId);
    postData();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <p>
            <Link to="/home">home</Link> / <Link to="">{post.title}</Link>
          </p>
          <Card>
            <CardBody>
              <CardText>
                Posted by{" "}
                <b>
                  {post.userData?.firstName} {post.userData?.middleName}{" "}
                  {post.userData?.lastName}{" "}
                </b>
                on <b>{post.createdDate}</b>
              </CardText>
              <hr />
              <CardTitle tag="h2">{post.title}</CardTitle>
              <div className=" text-center ">
                <CardImg
                  alt="Sample"
                  src={postImage}
                  style={{ width: "50%" }}
                />
              </div>
              <CardText
                className="mx-2 my-2 mt-4"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Card>
        <CardTitle className="mx-3 mt-3" tag="h4">
          Add Comment :
        </CardTitle>
        <CardBody>
          {/* add comment */}
          <div>
            <Input
              type="textarea"
              placeholder="Add comment ..."
              onChange={(newComment) =>
                setAddComment({ content: newComment.target.value })
              }
              value={addComment.content}
            />
            <Button className="mt-2" onClick={() => onSubmit()}>
              Submit
            </Button>
          </div>

          {/* show comment */}
          <div>
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
        </CardBody>
      </Card>
    </Container>
  );
};

export default PostPage;
