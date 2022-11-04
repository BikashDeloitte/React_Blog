import React from "react";
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

function SignUp() {
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
                <Form>
                  <FormGroup>
                    {/* first name field */}
                    <Label for="firstName">FirstName</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="enter first name"
                    />
                  </FormGroup>

                  {/* middle name field */}
                  <FormGroup>
                    <Label for="middleName">MiddleName</Label>
                    <Input
                      id="middleName"
                      type="text"
                      placeholder="enter middle name"
                    />
                  </FormGroup>

                  {/* last name field */}
                  <FormGroup>
                    <Label for="lastName">LastName</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="enter last name"
                    />
                  </FormGroup>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="enter email" />
                  </FormGroup>

                  {/* password field */}
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="enter password"
                    />
                  </FormGroup>

                  {/* about field */}
                  <FormGroup>
                    <Label for="about">Password</Label>
                    <Input
                      id="about"
                      type="textarea"
                      placeholder="enter about yourself"
                      style={{ height: "150px" }}
                    />
                  </FormGroup>

                  {/* container is use to make button center */}
                  <Container className="text-center">
                    <Button outline color="light">
                      Register
                    </Button>
                    <Button type="reset" className="ms-2">
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
