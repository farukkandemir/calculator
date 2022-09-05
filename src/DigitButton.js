import React from "react";

export default function DigitButton({ digit, dispatch }) {
  return (
    <button onClick={() => dispatch({ type: "ADD_DIGIT", payload: { digit } })}>
      {digit}
    </button>
  );
}
