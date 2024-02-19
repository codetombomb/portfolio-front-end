import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

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
  const [currentAdmin, setCurrentAdmin] = useState({})
  const [chatTime, setChatTime] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [deviceTokenId, setDeviceTokenId] = useState(null)
  const [currentChat, setCurrentChat] = useState({
    visitor_id: null,
    admin_id: null,
    room_id: "",
    id: null,
    messages: [],
    is_active: true
  });

  io.on("rooms", (rooms) => {
    setCurrentChatRooms([...rooms]);
  });

  io.on("chatData", (data) => {
    const currentChatCopy = JSON.parse(JSON.stringify(currentChat))
    setCurrentChat({ ...currentChatCopy, ...data })
  });

  io.on("currentAdmin", (data) => {
    setCurrentAdmin({ ...data })
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
    if (!currentTypers.includes(name)) {
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
    io.emit("initChat", currentAdmin, new Date().toISOString())
  }

  const onAdminLogin = (admin) => {
    setCurrentAdmin({ ...admin })
    setIsAdmin(true)
    io.emit("currentAdmin", admin)
  }

  useEffect(() => {
    fetch(`${API_URL}/current_admin`)
      .then(resp => resp.json())
      .then(data => {
        setCurrentAdmin({ ...data })
      })
  }, [])

  useEffect(() => {
    const timerId = setInterval(() => {
      setChatTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }, 1000)
    return () => {
      clearInterval(timerId)
    }
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
        setCurrentTypers,
        currentAdmin,
        setCurrentAdmin,
        isAdmin,
        setIsAdmin,
        onAdminLogin,
        deviceTokenId,
        setDeviceTokenId,
        chatTime
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;




// console.log("Thanks for checking out my site!\n\n⬛️⬛️⬛️🟥🟥🟥TOM⬛️⬛️⬛️⬛️\n⬛️⬛️🟥🟥🟥🟥🟥🟥🟥🟥🟥⬛️\n⬛️⬛️🟫🟫🟫🟨🟨🟫🟨⬛️⬛️⬛️\n⬛️🟫🟨🟫🟨🟨🟨🟫🟨🟨🟨⬛️\n⬛️🟫🟨🟫🟫🟨🟨🟨🟫🟨🟨🟫\n⬛️🟫🟫🟨🟨🟨🟨🟫🟫🟫🟫⬛️\n⬛️⬛️⬛️🟨🟨🟨🟨🟨🟨🟨⬛️⬛️\n⬛️⬛️🟥🟥🟦🟥🟥🟥⬛️⬛️⬛️⬛️\n⬛️🟥🟥🟥🟦🟥🟥🟦🟥🟥🟥⬛️\n🟥🟥🟥🟥🟦🟦🟦🟦🟥🟥🟥🟥\n⬜️⬜️🟥🟦🟨🟦🟦🟨🟦🟥⬜️⬜️\n⬜️⬜️⬜️🟦🟦🟦🟦🟦🟦⬜️⬜️⬜️\n⬜️⬜️🟦🟦🟦🟦🟦🟦🟦🟦⬜️⬜️\n⬛️⬛️🟦🟦🟦⬛️⬛️🟦🟦🟦⬛️⬛️\n⬛️🟫🟫🟫⬛️⬛️⬛️⬛️🟫🟫🟫⬛️\n🟫🟫🟫🟫⬛️⬛️⬛️⬛️🟫🟫🟫🟫\nCheck out my 8-Bit Mario CodePen: https://codepen.io/codetombomb-the-lessful/pen/VwyNwBm")