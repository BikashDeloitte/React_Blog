import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import { SignUpService } from "../../service/SignUpService";

function SignUp() {
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    error: {},
    isError: false,
  });

  //blinding of data
  const dataHandleChange = (event, field) => {
    // ...data mean take rest of data same as before
    //[] to make field dynamic
    setData({ ...data, [field]: event.target.value });
  };

  //sending data to api
  const onSumbitData = (event) => {
    //to prevent from sending empty data
    event.preventDefault();
    console.log(data);

    //calling api using service(axios)
    SignUpService(data)
      .then((resp) => {
        console.log(resp);
        console.log("successful");
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
      });
  };

  //reset data
  const resetData = () => {
    setData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      about: "",
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <Container>
        <Row>
          {/* making column size 6 and starting after 3 columns (total columns = 12) */}
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader className="text-center">
                <CardTitle tag="h3">
                  Fill up the information for Register
                </CardTitle>
              </CardHeader>
              <CardBody>
                {/* creating form */}
                <Form onSubmit={(e) => onSumbitData(e)}>
                  <FormGroup>
                    {/* first name field */}
                    <Label for="firstName">FirstName</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="enter first name"
                      onChange={(e) => dataHandleChange(e, "firstName")}
                      value={data.firstName}
                    />
                  </FormGroup>

                  {/* middle name field */}
                  <FormGroup>
                    <Label for="middleName">MiddleName</Label>
                    <Input
                      id="middleName"
                      type="text"
                      placeholder="enter middle name"
                      onChange={(e) => dataHandleChange(e, "middleName")}
                      value={data.middleName}
                    />
                  </FormGroup>

                  {/* last name field */}
                  <FormGroup>
                    <Label for="lastName">LastName</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="enter last name"
                      onChange={(e) => dataHandleChange(e, "lastName")}
                      value={data.lastName}
                    />
                  </FormGroup>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="enter email"
                      onChange={(e) => dataHandleChange(e, "email")}
                      value={data.email}
                    />
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="enter password"
                      onChange={(e) => dataHandleChange(e, "password")}
                      value={data.password}
                    />
                  </FormGroup>

                  {/* about field */}
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      id="about"
                      type="textarea"
                      placeholder="enter about yourself"
                      style={{ height: "150px" }}
                      onChange={(e) => dataHandleChange(e, "about")}
                      value={data.about}
                    />
                  </FormGroup>

                  {/* container is use to make button center */}
                  <Container className="text-center">
                    <Button outline color="light">
                      Register
                    </Button>
                    <Button
                      type="reset"
                      className="ms-2"
                      onClick={() => resetData()}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
