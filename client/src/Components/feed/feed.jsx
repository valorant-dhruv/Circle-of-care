import React, { useEffect, useState, useContext } from "react";
import "./feed.css";
import Context from "../../context";
import axios from "axios";
import { useQuery } from "react-query";
import { positions } from "@mui/system";

let buf;
let imageElem;

function Image({ imagepath }) {
  console.log(imagepath);
  let str = imagepath.substring(8);
  console.log(str);
  return (
    <div>
      <img
        style={{ width: "320px", height: "240px" }}
        // src={require(`../../uploads/${str}`)}
        src={`http://localhost:8080/images/${str}`}
        alt="Nope"
      ></img>
    </div>
  );
}
export default function Feed() {
  let [desc, setdesc] = useState("");
  let [images, setimages] = useState(null);
  let [userdata, setuserdata] = useContext(Context);

  let { data, isLoading } = useQuery("postsdata", () =>
    fetch("http://localhost:8080/api/posts/timeline/all", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userdata._id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => alert(err))
  );

  useEffect(() => {
    console.log(images);
  }, [images]);

  if (isLoading) {
    return <div>Loading the data...</div>;
  }

  console.log(data);
  const submitdata = async (event) => {
    const data = await new FormData();
    data.append("userId", userdata._id);
    data.append("desc", desc);
    data.append("file", images);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .post(`http://localhost:8080/api/posts`, data, config)
      .then((res) => {
        console.log("The post data is successfully submitted");
      });
  };

  return (
    <div style={{ marginTop: "50px;" }}>
      <div className="feed card m-">
        <div className="create-posts">
          <input
            className="input "
            type="text"
            placeholder="write the description"
            onChange={(e) => {
              setdesc(e.target.value);
            }}
          ></input>
          <br></br>
          <input
            type="file"
            className="btn btn-dark"
            accept="image/*
          "
            onChange={(e) => {
              const file = e.target.files[0];
              setimages(file);
            }}
          ></input>
          <br></br>
          <br></br>
          <button
            className="btn-primary"
            onClick={(e) => {
              submitdata();
            }}
          >
            Post
          </button>
        </div>
      </div>
      <br></br>

      <h1
        style={{
          textAlign: "center",
          marginLeft: "520px",
          position: "absolute",
        }}
      >
        Posts
      </h1>
      <br></br>
      <br></br>
      <div>
        {data.map((ele) => {
          return (
            <div
              className="posts card"
              style={{
                width: "500px",
                marginTop: "20px",
                marginLeft: "350px",
                height: "300px",
              }}
            >
              <h4>{ele.desc}</h4>
              <Image imagepath={ele.img_path} />
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <div>@Copyright- Dhruv Soni 2022</div>
    </div>
  );
}
