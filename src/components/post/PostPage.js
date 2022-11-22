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
import { getPostById } from "../../service/PostCategory";

const PostPage = () => {
  //to get post id for url and {} in variable as it is store dynamically
  const { postId } = useParams();

  //store post content data
  const [post, setPost] = useState({});
  //store particular post comment
  const [comment, setComment] = useState([]);

  const [addComment, setAddComment] = useState("");

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

  //add comment to particular post
  async function onSubmit() {
    if (!isLoggedIn()) {
      toast.warn("for comment please login");
    }

    const data = await createComment(addComment, postId);
    console.log(data);
    setComment([...comment, data]);
  }

  //trigger at load of this component
  useEffect(() => {
    getPostComment(postId);
    postData();
  }, []);

  console.log("productDetails", post.userData?.firstName);
  return (
    <Container>
      <Row>
        <Col>
          {console.log(post)}
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
                  src="https://picsum.photos/300/200"
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
              onChange={(newComment) => setAddComment(newComment)}
            />
            <Button className="mt-2" onClick={() => onSubmit()}>
              Submit
            </Button>
          </div>

          {/* show comment */}
          <div>
            {console.log("jhhhh", comment)}
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
