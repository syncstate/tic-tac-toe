import React from "react";

function Square({ value }: { value: string }) {
  return (
    <div className="d-flex align-items-center justify-content-center w-25 rounded mx-1 h-25 text-white bg-dark ">
      {value}
    </div>
  );
}
export default Square;
