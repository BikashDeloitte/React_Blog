import { React, useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Label,
  Container,
  Button,
} from "reactstrap";
import {
  CreatePost,
  PostCategory,
  uploadPostImage,
} from "../../service/PostCategory";
import { toast } from "react-toastify";
import { currentUser } from "../../auth/UserDataAuth";

function AddPost() {
  //store the post data
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    categoryId: -1,
  });

  const [postImage, setPostImage] = useState(null);

  //store dynamic category (at starting it is a empty array)
  const [categories, setCategories] = useState([]);

  //for rich text (JoditEditor)
  const editor = useRef(null);

  //rest the input data in post
  const resetData = () => {
    setNewPost({
      title: "",
      content: "",
      categoryId: -1,
    });

    setPostImage([]);
  };

  //store post data to state from form (binding data)
  const dataHandleChange = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  //post content with rich text (update)
  const contextUpdate = (newContent) => {
    setNewPost({ ...newPost, content: newContent });
  };

  //get dynamic post category (empty [] mean call once at starting)
  useEffect(() => {
    PostCategory()
      .then((data) => {
        setCategories(data);
        console.log(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(newPost);
  });

  const createNewPost = () => {
    console.log("submite", newPost);

    //input checking
    if (newPost.title.trim() === "") {
      toast.warning("Title can't be empty");
      return;
    }
    if (newPost.content.trim() === "") {
      toast.warning("Content can't be empty");
      return;
    }
    if (newPost.categoryId === null || newPost.categoryId == -1) {
      toast.warning("Please select the category");
      return;
    }

    //adding a new field in post data
    newPost["userId"] = currentUser().id;
    console.log(newPost);

    //calling api using service(axios) to create post
    CreatePost(newPost, postImage)
      .then((response) => {
        //after post is create upload post image
        uploadPostImage(postImage, response.id).catch((error) => {
          toast.error("unable to upload post image");
        });
        resetData();
        toast.success("Your post have been created");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };

  return (
    <div className="wrapper">
      <Card className="shadow">
        <CardHeader>
          <CardTitle>Add Post</CardTitle>
        </CardHeader>
        <CardBody>
          <h3>What is on your mind?</h3>
          <Form>
            {/* post title */}
            <FormGroup>
              <Label for="title">Post Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={newPost.title}
                placeholder="enter post tilte"
                onChange={(e) => dataHandleChange(e)}
              />
            </FormGroup>

            {/* post cotent */}
            <FormGroup>
              <Label for="content">Post Content</Label>

              {/* joditEditor libary is use for in rich text */}
              <JoditEditor
                ref={editor}
                value={newPost.content}
                // config={config}
                onChange={(newContent) => contextUpdate(newContent)}
              />
            </FormGroup>

            {/* post category */}
            <FormGroup>
              <Label for="categoryId">Post Category</Label>
              <Input
                id="categoryId"
                type="select"
                value={newPost.categoryId}
                name="categoryId"
                onChange={(e) => dataHandleChange(e)}
              >
                <option disabled value={-1}>
                  --select category--
                </option>
                {
                  //using map of javascript to display dynamic categories
                  categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.category}
                      </option>
                    );
                  })
                }
              </Input>

              {/* post image */}
              <FormGroup>
                <Label for="postImage">Post Image</Label>
                <Input
                  type="file"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setPostImage(e.target.files[0]);
                  }}
                />
              </FormGroup>
            </FormGroup>

            <Container className="text-center">
              <Button color="primary" onClick={() => createNewPost()}>
                Create Post
              </Button>
              <Button
                type="reset"
                className="ms-2"
                color="danger"
                onClick={() => resetData()}
              >
                Rest Post
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddPost;
