import "./App.css";
import Navbar from "./Components/Navbar/navbar.jsx";
import Sidebar from "./Components/Sidebar/sidebar.jsx";
import Feed from "./Components/feed/feed.jsx";
import RightBar from "./Components/rightbar/rightbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoMain from "./Components/todo/Todo-Main.jsx";
import Quiz from "./Components/quiz/App.jsx";
import Login from "./Components/login_signup/login_signup";
import { useState, useContext } from "react";
import Context from "./context";
import { width } from "@mui/system";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "../src/Components/profile_page/profile_page";
import Messanger from "../src/Components/messanger/messanger.jsx";
import ChatApp from "../src/Components/ChatApp/Chatapp.jsx";

function Main() {
  return (
    <div>
      <Navbar />
      <div className="main" style={{ display: "flex", height: "100%" }}>
        <Sidebar />
        <Feed />
        <RightBar />
      </div>
    </div>
  );
}
function App() {
  let [userdata, setuserdata] = useState({ tp: "1" });
  return (
    <Context.Provider value={[userdata, setuserdata]}>
      <div className="App">
        <div className="main">
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/main" exact element={<Main />} />
              <Route path="/todo" exact element={<TodoMain />} />
              <Route path="/quiz" exact element={<Quiz />} />
              <Route path="/account" exact element={<Profile />} />
              <Route path="/messenger" exact element={<Messanger />} />
              <Route
                path="/friend/:id"
                element={<ChatApp userId={userdata._id} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
