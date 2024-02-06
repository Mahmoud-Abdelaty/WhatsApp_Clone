import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useSetValue } from "./StateProvider";
import "firebase/firestore";

export default function Chat() {
  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useSetValue();
  const currentTimestamp = new Date();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    const seeds = [
      "Precious",
      "Abby",
      "Snickers",
      "Simba",
      "Sasha",
      "Salem",
      "Angel",
      "Casper",
      "Lucky",
      "Socks",
      "Peanut",
      "Tigger",
      "Zoe",
      "Nala",
      "Gracie",
      "Gizmo",
    ];

    const randomIndex = Math.floor(Math.random() * seeds.length);
    const randomSeed = seeds[randomIndex];
    setSeed(randomSeed);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You Typed >>>", message);
    console.log("Messages >>>", messages);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: message,
      name: user.displayName,
      timeStamp: currentTimestamp,
    });

    setMessage("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
        />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last Seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timeStamp.toDate()
            ).toUTCString() === "Invalid Date"
              ? "..."
              : new Date(
                  messages[messages.length - 1]?.timeStamp.toDate()
                ).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages?.map((message) => (
          <p
            key={message.timestamp}
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timeStamp?.toDate()).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={message}
            type="text"
            placeholder="Type a Message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}
// Message.name === userEvent.displayName;
