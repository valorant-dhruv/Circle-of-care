import React, { useRef, useState, useContext } from "react";
import "./navbar.css";
import { useQuery } from "react-query";
import { Search } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Link, BrowserRouter } from "react-router-dom";
import Context from "../../context";

export default function Navbar() {
  let [render, setrender] = useState(true);
  let [search, setSearch] = useState("");
  let [userdata, setuserdata] = useContext(Context);
  let [datas, setdatas] = useState({ username: "Not found" });

  function follow() {
    fetch(`http://localhost:8080/api/users/${datas._id}/follow`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: userdata._id,
      }),
    }).then((res) => {
      if (res.status == 400) {
        alert(
          "Either the user is trying to follow itself or the user already follows the other user"
        );
      } else {
        alert("The user has been followed");
      }
    });
  }

  let { data, isLoading, error } = useQuery([search], () => {
    fetch(`http://localhost:8080/searchuser/${search}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setdatas(data);
        return data;
      })
      .catch((err) => {
        return err;
      });
  });
  return (
    <div className="navbar">
      <div className="navbar-text">Circle Of Care-Depstar</div>
      <div className="navbar-search">
        <Search />
        <input
          type="text"
          placeholder="Search for friends..."
          className="search-bar"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
      </div>
      <div className="navbar-third">
        {/* <div className="navbar-third-links">
          <span className="links-home">HomePage</span>
          <span className="links-timeline">Timeline</span>
        </div> */}

        {/* <div className="third-comp">
          <div className="icons">
            <PersonIcon />
            <ChatBubbleIcon />
          </div> */}

        <Link to="/account" style={{ marginLeft: "20px;" }}>
          My Account
        </Link>
        <span>Welcome {userdata.username}</span>
        <pre>{datas.username}</pre>
        {datas.username === "Not found" ? (
          <p></p>
        ) : (
          <button
            onClick={(e) => {
              follow();
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
