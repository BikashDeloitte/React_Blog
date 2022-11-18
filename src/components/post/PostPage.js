import { useEffect, React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { getPostById } from "../../service/PostCategory";

const PostPage = () => {
  //to get post id for url and {} in variable as it is store dynamically
  const { postId } = useParams();

  const [post, setPost] = useState({});

  const postData = async () => {
    const data = await getPostById(postId);
    setPost(data);
  };

  useEffect(() => {
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
    </Container>
  );
};

export default PostPage;
