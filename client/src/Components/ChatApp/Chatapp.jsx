import React, { useEffect, useRef, useState } from "react";
export default function ChatApp({ userId }) {
  const pathname = window.location.pathname;
  console.log(pathname);
  let receiverId = pathname.substring(8);
  console.log(receiverId);
  console.log(typeof receiverId);
  let [conversationdata, setconversationdata] = useState();
  useEffect(() => {
    setconversationdata(async () => {
      let response = await fetch(
        `http:localhost:8080/find/${userId}/${receiverId}`
      );
      let data = await response.json();
      console.log(data);
      return data;
    });
  }, []);

  console.log(conversationdata);

  return <div>Welcome to the chatting application</div>;
}
