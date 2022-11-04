import React from "react";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";

function MainContainer() {
  return (
    <div>
      <h1>MainContainer</h1>
      <Card
        featured="Car"
        item1="Lamborghini Diablo"
        item2="Ford Raptor"
        item3="Ferrari Testarossa"
      ></Card>
    </div>
  );
}

export default MainContainer;
