import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import db from "./firebase";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

export default function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

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

  const createChat = () => {
    const roomName = prompt("Please Enter Name Room for Chat Room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
        />
        <div className="sidebarChat_info">
          <h2>{name ?? "Not Found"}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}
