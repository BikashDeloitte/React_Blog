import React from "react";

function Card({ featured, item1, item2, item3 }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-header">{featured}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{item1}</li>
        <li className="list-group-item">{item2}</li>
        <li className="list-group-item">{item3}</li>
      </ul>
    </div>
  );
}

export default Card;
