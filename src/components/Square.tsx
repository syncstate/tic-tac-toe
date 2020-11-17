import React from "react";

function Square(props: any) {
  console.log(props[0]);
  return (
    <div className="d-flex align-items-center justify-content-center w-25 rounded mx-1 h-25 text-white bg-dark ">
      {props[0]}
    </div>
  );
}
export default Square;
