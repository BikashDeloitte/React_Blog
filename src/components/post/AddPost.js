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
import { PostCategory } from "../../service/PostCategory";

function AddPost() {
  //store the post data
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
  });

  //store dynamic category (at starting it is a empty array)
  const [categories, setCategories] = useState([]);

  //for rich text (JoditEditor)
  const editor = useRef(null);

  //store the rich text data
  const [content, setContent] = useState("");

  //rest the input data in post
  const resetData = () => {
    setNewPost({
      title: "",
      content: "",
      category: "",
    });
  };

  const contextUpdate = (context) => {
    setContent(context);
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
              <Input id="title" type="text" placeholder="enter post tilte" />
            </FormGroup>

            {/* post cotent */}
            <FormGroup>
              <Label for="content">Post Content</Label>

              {/* joditEditor libary is use for in rich text */}
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => contextUpdate(newContent)}
              />
            </FormGroup>

            {/* post category */}
            <FormGroup>
              <Label for="category">Post Category</Label>
              <Input id="category" type="select" name="select">
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
            </FormGroup>

            <Container className="text-center">
              <Button color="primary">Create Post</Button>
              <Button
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
