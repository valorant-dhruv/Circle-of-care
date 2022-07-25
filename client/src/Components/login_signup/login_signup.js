import React, { useState, useEffect, useRef, useContext } from "react";
import "./login_signup.css";
import { BrowserRouter, Route } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";
import Context from "../../context";

const queryClient = require("../../client");

const Login_signup = () => {
  const [data, setData] = useState({ email: "None", password: "None" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const linkref = useRef(null);
  const [display, setdisplay] = useState(true);

  let [userdata, setuserdata] = useContext(Context);

  useEffect(() => {
    console.log("We have finally got the user data");
    setdisplay((old) => {
      return !old;
    });
  }, [userdata]);

  // useEffect(() => {
  //   console.log(linkref.current);
  // });

  const mutation = useMutation((string, obj, which) => {
    fetch(`http://localhost:8080/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setuserdata(data);
        if (data.name === "MongoServerError") {
          alert("The same email id cannot be registered again");
        }
      })
      .catch((err) => {
        alert(
          "Cannot Register! Either the email id is already registered or you are not a part of Charusat"
        );
      });
  });

  const mutation2 = useMutation((string, obj, which) => {
    fetch(`http://localhost:8080/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setuserdata(data);
        if (data.name === "MongoServerError") {
          alert("Error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid email id or password");
      });
  });

  function Submitted(e) {
    e.preventDefault();
    let obj = { email, password };
    console.log(obj);
    mutation2.mutateAsync("api/auth/login", obj, false);
  }
  const handleSignIn = () => {
    document
      .querySelector("#modalContainer")
      .classList.remove("right-panel-active");
  };
  const handleSignUp = () => {
    document
      .querySelector("#modalContainer")
      .classList.add("right-panel-active");
  };

  function signupsubmitted(e) {
    e.preventDefault();
    let obj = {
      name,
      email,
      password,
    };
    console.log(obj);
    mutation.mutateAsync("api/auth/register", obj, true);
  }

  if (display) {
    return (
      <div>
        <Link to="/main">Click here to move to the next page</Link>
      </div>
    );
  }

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer" id="modalContainer">
          <div className="form-container sign-up-container">
            <form className="modalForm" onSubmit={signupsubmitted}>
              <h1 className="title">Create Account</h1>
              <input
                className="input-modal"
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                className="input-modal"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                className="input-modal"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <input type="submit" value="Sign Up"></input>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="modalForm" onSubmit={Submitted}>
              <h1 className="title">Welcome Back 🎉</h1>

              <br />
              <span className="spanText mt-2">Login</span>
              <input
                className="input-modal"
                name="email"
                type="name"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                className="input-modal"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input type="submit" value="Sign In"></input>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="title">Welcome Back!</h1>
                <p className="paraText">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost modalButton"
                  id="signIn"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="title">Hello, Friend!</h1>
                <p className="paraText">
                  Enter your personal details and start journey with us
                </p>
                <button
                  className="ghost modalButton"
                  id="signUp"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login_signup;
