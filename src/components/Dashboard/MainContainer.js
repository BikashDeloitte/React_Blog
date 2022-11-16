import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Collapse,
  Container,
} from "reactstrap";
import { currentUser, isLoggedIn } from "../../auth/UserDataAuth";
import { getAllPost } from "../../service/PostCategory";

function MainContainer() {
  const [isLogin, setIsLogin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  //getting all post asynchronously
  async function getAllPostAysnc() {
    setPosts(await getAllPost(user.id));
    return;
  }

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUser(currentUser());
    getAllPostAysnc();
  }, [isLogin]);

  // useEffect(() => {
  //   setIsLogin(isLoggedIn());
  //   setUser(currentUser());
  //   getAllPostAysnc();
  // }, []);

  return (
    <div>
      <h1>BLogs</h1>
      {console.log("p", posts)}

      {posts.map((post) => {
        return (
          <Container key={post.id}>
            <Card>
              <img alt="Sample" src="https://picsum.photos/300/200" />

              <CardBody>
                <CardTitle tag="h2">{post.title}</CardTitle>
                <Collapse isOpen={isOpen}>
                  {/*  dangerouslySetInnerHTML for convert string html content to real html*/}
                  <CardText
                    tag="h5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </Collapse>

                <Button
                  color="primary"
                  onClick={toggle}
                  style={{ marginBottom: "1rem" }}
                >
                  read more
                </Button>
              </CardBody>
            </Card>
          </Container>
        );
      })}
    </div>
  );
}

export default MainContainer;
