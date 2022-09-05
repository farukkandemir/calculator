import React from "react";

export default function OperationButton({ operation, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: "CHOOSE_OPERATION", payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
