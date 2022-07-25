import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import Context from "../../context";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function RightBar() {
  let [userdata, setuserdata] = useContext(Context);
  const [isloading, setisloading] = useState(true);
  let followings = userdata.followings;
  console.log(followings);
  let followdata;

  let { data, isFetched } = useQuery("followers", () => {
    return fetch(`http://localhost:8080/api/users/followers/${userdata._id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  });

  console.log(isFetched);

  if (!isFetched) {
    return <div>Is loading...</div>;
  }

  console.log(data);

  if (isFetched) {
    return (
      <div>
        <h1>You Follow these people</h1>
        {data.map((ele) => {
          return (
            <div>
              <Link to={`/friend/${ele._id}`}>{ele.username}</Link>;
              <br />
            </div>
          );
        })}
      </div>
    );
  }

  // if (isFetched) {
  //   return <div>{followersdata[0].username}</div>;
  // }

  // return (
  //   <div>
  //     {/* {followersdata.map((ele) => {
  //       return <p>{ele.username}</p>;
  //     })} */}
  //     Data is fetched
  //   </div>
  // );

  // let promise = followings.map(async (ele) => {
  //   await fetch(`http://localhost:8080/api/users/${ele}`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       names = [...names, data];
  //       console.log(names);
  //       return data;
  //     });
  // });
  // Promise.all(promise).then(() => {
  //   return (
  //     <div className="rightbar">
  //       <h1>Chat with your friends</h1>
  //       <p>These are the friends</p>
  //       {names.map((ele) => {
  //         console.log(ele);
  //         return <p>{ele.username}</p>;
  //       })}
  //     </div>
  //   );
  // });
}
