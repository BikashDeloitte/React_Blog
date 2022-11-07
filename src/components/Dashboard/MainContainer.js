import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

function MainContainer() {
  return (
    <div>
      <h1>MainContainer</h1>
      <Card
        style={{
          width: "200px",
        }}
      >
        <CardBody>
          <CardTitle>Cars</CardTitle>
        </CardBody>
        <ListGroup flush>
          <ListGroupItem>Lamborghini Diablo</ListGroupItem>
          <ListGroupItem>Ford Raptor</ListGroupItem>
          <ListGroupItem>Ferrari Testarossa</ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export default MainContainer;
