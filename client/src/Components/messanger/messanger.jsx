import react from "react";
import Message from "../message/message";

function Messanger() {
  return (
    <div>
      <Message message="Hii" true />
      <Message message="Hello" false />
      <Message message="Hii" true />
    </div>
  );
}

export default Messanger();
