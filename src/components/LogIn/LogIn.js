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

function LogIn() {
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
                <Form>
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

                  {/* container is use to make button center */}
                  <Container className="text-center">
                    <Button outline color="light">
                      Login
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

export default LogIn;
