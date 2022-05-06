import React, { useState } from "react";
import db from "../../firebase";
import "./ChatInput.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function ChatInput({ channelName, channelId, user }) {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      let payload = {
        message: input,
        timestamp: firebase.firestore.Timestamp.now(),
        user: user.name,
        userImage: user.photo,
      };
      db.collection("rooms").doc(channelId).collection("messages").add(payload);
    }
    setInput("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          placeholder={`Message #${channelName}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
