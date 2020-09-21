import React from "react";

import Classes from "./Input.css";
const Input = (props) => {
  const inputClasses = [Classes.InputElement];
  if (props.Touched && props.Invalid && props.ShouldValidate) {
    inputClasses.push(Classes.Invalid);
  }
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.option.map((el) => (
            <option key={el.value} value={el.value}>
              {el.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={Classes.Input}>
      <label className={Classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
