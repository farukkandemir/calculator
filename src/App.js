import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

function calculatorReducer(state, { type, payload }) {
  switch (type) {
    case "ADD_DIGIT":
      if (state.overWrite) {
        return {
          ...state,
          currentOutput: payload.digit,
          previousOutput: null,
          overWrite: false,
        };
      }

      if (state.currentOutput === "0" && payload.digit === "0") return state;
      if (payload.digit === "." && state.currentOutput.includes("."))
        return state;
      return {
        ...state,
        currentOutput: `${state.currentOutput || ""}${payload.digit}`,
      };

    case "DELETE_DIGIT":
      if (state.currentOutput == null) return state;

      return {
        ...state,
        currentOutput: `${state.currentOutput.substring(
          0,
          state.currentOutput.length - 1
        )}`,
      };

    case "CHOOSE_OPERATION":
      if (state.currentOutput == null && state.previousOutput == null) {
        return state;
      }

      if (state.previousOutput == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOutput: state.currentOutput,
          currentOutput: null,
        };
      }

      if (state.currentOutput == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      return {
        ...state,
        previousOutput: evaluate(state),
        operation: payload.operation,
        currentOutput: null,
      };

    case "CALCULATE":
      if (
        state.currentOutput == null ||
        state.previousOutput == null ||
        state.operation == null
      ) {
        return {
          state,
        };
      }
      return {
        ...state,
        overWrite: true,
        currentOutput: evaluate(state),
        previousOutput: null,
        operation: null,
      };

    case "CLEAR":
      return {};

    default:
      break;
  }
}

function evaluate({ currentOutput, previousOutput, operation }) {
  const prev = parseFloat(previousOutput);
  const curr = parseFloat(currentOutput);
  if (isNaN(prev) || isNaN(curr)) return "";
  let result = "";
  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "÷":
      result = prev / curr;
      break;
  }
  return result.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOutput(output) {
  if (output == null) return;
  const [integer, decimal] = output.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOutput, previousOutput, operation }, dispatch] = useReducer(
    calculatorReducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-output">
          {formatOutput(previousOutput)} {operation}
        </div>
        <div className="current-output">{formatOutput(currentOutput)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: "CLEAR" })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: "DELETE_DIGIT" })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}></OperationButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button
        className="span-two"
        onClick={() => dispatch({ type: "CALCULATE", payload: { operation } })}
      >
        =
      </button>
    </div>
  );
}

export default App;
