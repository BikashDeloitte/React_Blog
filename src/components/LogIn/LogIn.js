import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { doLoggedIn } from "../../auth/UserDataAuth";
import { LoginService } from "../../service/LoginService";

function LogIn() {
  var token;
  const navigate = useNavigate();
  //state for email and password
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //state for errors
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //reset data
  const resetData = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };

  //blinding of data
  const dataHandleChange = (event, field) => {
    // ...data mean take rest of data same as before
    //[] to make field dynamic
    setLoginData({ ...loginData, [field]: event.target.value });
  };

  //sending data to api
  const onSumbitData = (event) => {
    //to prevent from sending empty data
    event.preventDefault();
    console.log("login data 0-0-0- > ", loginData);

    //validation of email and password
    if (loginData.email.trim() == "" || loginData.password.trim() == "") {
      toast.error("Required email or password");
      return;
    }

    //send login data to api for token
    token = LoginService(loginData)
      .then((response) => {
        //storing response(token) in local storage
        doLoggedIn(response);

        //to nagivate/redirect login page to user dashboard
        navigate("/user/dashboard");

        toast.success("login success");
      })
      .catch((error) => {
        console.log("error --=> {0}", error);
        if (error.response.data.status == 400) {
          toast.error("password is wrong, please check");
        } else if (error.response.data.status == 404) {
          toast.error("Couldn't find email");
        } else {
          toast.error("something went wrong");
        }

        setError({
          errors: error,
          isError: true,
        });
      });
  };

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  return (
    <div>
      <Container>
        <Row>
          {/* making column size 6 and starting after 3 columns (total columns = 12) */}
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader className="text-center">
                <CardTitle tag="h3">Login Here</CardTitle>
              </CardHeader>
              <CardBody>
                {/* creating form */}
                <Form onSubmit={(e) => onSumbitData(e)}>
                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="enter email"
                      value={loginData.email}
                      onChange={(e) => dataHandleChange(e, "email")}
                    />
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="enter password"
                      value={loginData.password}
                      onChange={(e) => dataHandleChange(e, "password")}
                    />
                  </FormGroup>

                  {/* container is use to make button center */}
                  <Container className="text-center">
                    <Button outline color="light">
                      Login
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

export default LogIn;
