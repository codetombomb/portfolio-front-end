import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export const ChatContext = createContext();

export const io = socketIOClient(import.meta.env.VITE_SOCKET_URL)
const API_URL = import.meta.env.VITE_API_URL

const ChatProvider = ({ children }) => {

  const [newMessage, setNewMessage] = useState("");
  const [currentChatRooms, setCurrentChatRooms] = useState([]);
  const [activeAdmins, setActiveAdmins] = useState([])
  const [isInputFocused, setInputFocused] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(false);
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypers, setCurrentTypers] = useState([])
  const [currentChat, setCurrentChat] = useState({
    visitor_id: null,
    admin_id: null,
    room_id: "",
    chat_time_stamp: Intl.DateTimeFormat('en', { weekday: "short", hour: "numeric", minute: "numeric", hour12: true }).format(new Date()),
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
    setCurrentChat({ ...currentChatCopy, ...data})
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

  io.on("typing", (name) => {
    if (!currentTypers.includes(name)){
      const newTypers = [...currentTypers, name]
      setCurrentTypers(newTypers)
    }
  })

  io.on("stopped typing", (name) => {
    setCurrentTypers((prevTypers) => prevTypers.filter((typer) => typer !== name));
  });

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
        setInputFocused,
        isTyping, 
        setIsTyping,
        currentTypers,
        setCurrentTypers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
