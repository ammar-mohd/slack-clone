import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import db from "../../firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat({ user }) {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-header-left">
          <h4 className="chat-header-name">
            <strong>#{roomDetails?.name}</strong>
            <StarBorderIcon />
          </h4>
        </div>
        <div className="chat-header-right">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      <div className="chat-messages">
        {roomMessages.map((msg, index) => (
          <Message
            key={index}
            message={msg.message}
            timestamp={msg.timestamp}
            user={msg.user}
            userImage={msg.userImage}
          />
        ))}
      </div>

      <ChatInput
        channelName={roomDetails?.name}
        channelId={roomId}
        user={user}
      />
    </div>
  );
}

export default Chat;
