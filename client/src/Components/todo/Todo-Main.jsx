import React, { useState, useReducer } from "react";
import Todo from "./Todo";
import { Link } from "react-router-dom";
// To do List for dhruv
// It has the following features:
//1)Add a new task
//2)Mark the task as completed
//3)DeLete a task
// This is the function that will be called by the dispatch
// function
// It already contains the state value by default
// The action value is the object which contains the fields rthat
// are passed by the user
//UsuaLLy the common trend is that it contains the type and the
// pay Load
// The type defines which operation we need to perform on the data
// The payload is the additional data that is send to the function

function func(state, action) {
  console.log(state);
  if (action.type == "Add") {
    state.push({ id: Date.now(), value: action.payload });
    console.log(state);
    return state;
  }

  if (action.type == "Delete") {
    let another = state.filter((ele) => {
      return ele.id != action.payload.id;
    });

    console.log(state);
    console.log(another);
    return another;
  }
}
function App() {
  let [todo, settodo] = useState("");
  let [todos, dispatch] = useReducer(func, []);

  function formsubmit(e) {
    e.preventDefault();
    dispatch({ type: "Add", payload: todo });
    settodo("");
  }
  return (
    <div className="App">
      <h1>Dhruv's to do list</h1>
      <form onSubmit={formsubmit}>
        <input
          type="text"
          value={todo}
          placeholder="To do list task"
          onChange={(e) => {
            settodo(e.target.value);
          }}
        ></input>
        <input type="submit"></input>
      </form>
      {todos.map((ele) => {
        console.log(ele);
        return <Todo key={ele.id} todo={ele} dispatch={dispatch} />;
      })}

      <Link to="/main">Go to HomePage</Link>
    </div>
  );
}

export default App;
