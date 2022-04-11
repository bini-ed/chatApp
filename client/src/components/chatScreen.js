import React, { useEffect, useState } from "react";
import axios from "axios";

function ChatScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {data.map((chat) => (
        <p key={chat._id}>{chat.chatName}</p>
      ))}
    </div>
  );
}

export default ChatScreen;
