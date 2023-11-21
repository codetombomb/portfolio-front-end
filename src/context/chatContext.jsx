import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export const ChatContext = createContext();

// const io = socketIOClient("http://localhost:3001")
const io = socketIOClient("https://portfolio-chat-server-rjvo.onrender.com")


const ChatProvider = ({ children }) => {

  const [newMessage, setNewMessage] = useState("");
  const [currentChatRooms, setCurrentChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentChat, setCurrentChat] = useState({
    visitor_id: null,
    admin_id: null,
    room_id: "",
    chat_time_stamp: "",
    id: null,
    messages: []
});

  io.on("rooms", (rooms) => {
    setCurrentChatRooms([...rooms]);
  });

  io.on("chatData", (data) => {
    const currentChatCopy = JSON.parse(JSON.stringify(currentChat))
    setCurrentChat({...currentChatCopy, ...data}) 
  });

  // useEffect(() => {
  //   initChat();
  //   getRooms();

  // }, []);

  const getRooms = () => {
    io.emit("getChats");
  };

  const initChat = () => {
    io.emit("initChat")
  }
  
  return (
    <ChatContext.Provider
      value={{
        io,
        currentChatRooms,
        setCurrentChatRooms,
        selectedRoom,
        setSelectedRoom,
        currentChat,
        setCurrentChat,
        newMessage,
        setNewMessage,
        initChat,
        getRooms
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
