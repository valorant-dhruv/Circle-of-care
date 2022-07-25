import React, { useContext } from "react";
import "./sidebar.css";
import TodoMain from "../todo/Todo-Main";
import Quiz from "../quiz/App";
import { Link, BrowserRouter } from "react-router-dom";
import Context from "../../context";

function Sidebar() {
  let [userdata, setuserdata] = useContext(Context);
  return (
    <div className="side-bar">
      <Link to="/todo" style={{ fontSize: "30px" }}>
        To do list
      </Link>
      <br></br>
      <br></br>
      <br></br>
      <Link to="/quiz" style={{ fontSize: "30px" }}>
        Quiz App
      </Link>
      ;
    </div>
  );
}

export default Sidebar;
