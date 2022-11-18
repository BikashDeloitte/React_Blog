import { useEffect, React, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { currentUser, isLoggedIn } from "../../auth/UserDataAuth";
import { getAllPost } from "../../service/PostCategory";

function MainContainer() {
  const [isLogin, setIsLogin] = useState(false);
  const [posts, setPosts] = useState({
    allPost: [],
    pageNumber: 0,
    pageSize: 0,
    totalElement: 0,
    totalPage: 0,
    latePage: false,
  });
  const [user, setUser] = useState({});

  //getting all post asynchronously
  async function getAllPostAysnc(pageNumber = 0, pageSize = 5) {
    const data = await getAllPost(user.id, pageNumber, pageSize);
    setPosts({
      allPost: data.post,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElement: data.totalElement,
      totalPage: data.totalPage,
      latePage: data.latePage,
    });

    //move to top of scroll
    window.scroll(0, 0);
    return;
  }

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUser(currentUser());
    getAllPostAysnc();
  }, [isLogin]);

  return (
    <div>
      <h1>BLogs</h1>
      {console.log("p", posts)}

      {posts.allPost.map((blog) => {
        return (
          <Container key={blog.id}>
            <Card color="dark" outline className="mb-2">
              {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}

              <CardBody>
                <CardTitle tag="h2">{blog.title}</CardTitle>

                <CardText
                  style={{ margin: "30px" }}
                  tag="h5"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 2000),
                  }}
                />

                <Link
                  to={"/post/" + blog.id}
                  className="btn btn-secondary my-2 ms-2"
                >
                  read more
                </Link>
              </CardBody>
            </Card>
          </Container>
        );
      })}

      {/* pagination */}
      <Container className="text-center mt-5">
        <Pagination>
          <PaginationItem disabled={posts.pageNumber == 0 ? true : false}>
            <PaginationLink first onClick={() => getAllPostAysnc(0)} />
          </PaginationItem>
          <PaginationItem disabled={posts.pageNumber == 0 ? true : false}>
            <PaginationLink
              previous
              onClick={() => getAllPostAysnc(posts.pageNumber - 1)}
            />
          </PaginationItem>

          {[...Array(posts.totalPage)].map((items, index) => {
            return (
              <PaginationItem
                key={index}
                active={posts.pageNumber == index}
                color="dark"
              >
                <PaginationLink onClick={() => getAllPostAysnc(index)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem disabled={posts.latePage}>
            <PaginationLink
              onClick={() => getAllPostAysnc(posts.pageNumber + 1)}
              next
            />
          </PaginationItem>
          <PaginationItem disabled={posts.latePage}>
            <PaginationLink
              last
              onClick={() => getAllPostAysnc(posts.totalPage - 1)}
            />
          </PaginationItem>
        </Pagination>
      </Container>
    </div>
  );
}

export default MainContainer;
