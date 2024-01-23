import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export const ChatContext = createContext();

// export const io = socketIOClient("http://localhost:3001")
export const io = socketIOClient("https://portfolio-chat-server-rjvo.onrender.com")

// const API_URL = "http://127.0.0.1:5000"
const API_URL = "https://portfolio-api-ws.onrender.com"


const ChatProvider = ({ children }) => {

  const [newMessage, setNewMessage] = useState("");
  const [currentChatRooms, setCurrentChatRooms] = useState([]);
  const [activeAdmins, setActiveAdmins] = useState([])
  const [isInputFocused, setInputFocused] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(false);
  const [currentChat, setCurrentChat] = useState({
    visitor_id: null,
    admin_id: null,
    room_id: "",
    chat_time_stamp: "",
    id: null,
    messages: [],
    is_active: true
  });

  document.addEventListener("visibilitychange", () => {
    io.emit("closeChat", currentChat)
  })

  io.on("rooms", (rooms) => {
    setCurrentChatRooms([...rooms]);
  });

  io.on("chatData", (data) => {
    const currentChatCopy = JSON.parse(JSON.stringify(currentChat))
    setCurrentChat({ ...currentChatCopy, ...data, chat_time_stamp: Intl.DateTimeFormat('en', { weekday: "short", hour: "numeric", minute: "numeric", hour12: true }).format(new Date()) })
  });

  io.on("activeAdmins", (data) => {
    const activeAdminsCopy = JSON.parse(JSON.stringify(activeAdmins))
    const newAdmins = [...activeAdminsCopy, data]
    setActiveAdmins(newAdmins)
  })

  io.on("removeActiveAdmin", (removedAdmin) => {
    const filteredAdmins = activeAdmins.filter(admin => admin.id !== removedAdmin.id)
    setActiveAdmins(filteredAdmins)
  })

  io.on("endChat", (chat) => {
    setSelectedRoom(false);
    setCurrentChat({ ...chat })
  })

  const getRooms = () => {
    io.emit("getChats");
  };

  const initChat = () => {
    io.emit("initChat")
  }

  useEffect(() => {
    fetch(`${API_URL}/current_admins`)
      .then(resp => resp.json())
      .then(data => setActiveAdmins([...data]))
  }, [])

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
        getRooms,
        activeAdmins,
        setActiveAdmins,
        isInputFocused,
        setInputFocused
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
