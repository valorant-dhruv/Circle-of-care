import React, { useContext, useState } from "react";
import "./profile_page.css";
// import home from "../../icons/home.png";
// import cover from "../../images/cover.jpg";
// import profile from "../../images/profile.png";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Context from "../../context";

const Profile_page = ({ clicked, user }) => {
  let [userdata, setuserdata] = useContext(Context);
  let [images, setimages] = useState([]);

  if (clicked) {
    setuserdata(user);
  }

  // setimages(data,()=>
  // {
  //   let another1=
  // })

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

  function convertBase64(file) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(file.data)));
    console.log(base64);
    return base64;
    // return new Promise((resolve, reject) => {
    //   const filereader = new FileReader();
    //   filereader.readAsDataURL(file);

    //   filereader.onload = () => {
    //     console.log(filereader.result);
    //     resolve(filereader.result);
    //   };

    //   filereader.onerror = (error) => {
    //     reject(error);
    //   };
    // });
  }

  let { data, isLoading } = useQuery("postsdata", () =>
    fetch("http://localhost:8080/api/posts/timeline/single", {
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
        setimages(data);
        return data;
      })
      .catch((err) => alert(err))
  );

  if (isLoading) {
    return <div>Loading the data...</div>;
  }
  console.log(data);
  let data2;
  let base64;

  return (
    <>
      <div>
        <h1>Welcome to the user profile section of Circle of Care</h1>
        <h3>{userdata.username}</h3>
        <br />
        {/* <button>Follow the user</button>; */}
      </div>
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
    </>
  );
};
export default Profile_page;
