import React, { useRef, useEffect, useContext } from "react";
import Context from "../../context";
export default function Todo({ todo, dispatch }) {
  //element={current:p tag object}
  let [userdata, setuserdata] = useContext(Context);
  let element = useRef();
  useEffect(() => {
    console.log(element);
  });

  function completed() {
    if (element.current.innerText.indexOf("(") != -1) {
      element.current.innerText = element.current.innerText.substring(
        0,
        element.current.innerText.indexOf("(")
      );
    } else {
      element.current.innerText += "(completed)";
    }
  }

  function deleted() {
    dispatch({ type: "Delete", payload: todo });
  }

  return (
    <div>
      <p ref={element}>{todo.value}</p>
      <button onClick={completed}>Completed?</button>
      <button onClick={deleted}>Delete</button>
    </div>
  );
}
