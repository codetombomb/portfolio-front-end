import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export const ChatContext = createContext();

// export const io = socketIOClient("http://localhost:3001")
const io = socketIOClient("https://portfolio-chat-server-rjvo.onrender.com")

// const API_URL = "http://127.0.0.1:5000"
const API_URL = "https://portfolio-api-ws.onrender.com"


const ChatProvider = ({ children }) => {

  const [newMessage, setNewMessage] = useState("");
  const [currentChatRooms, setCurrentChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeAdmins, setActiveAdmins] = useState([])
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
    console.log("chat data listener in chat context", data)
    const currentChatCopy = JSON.parse(JSON.stringify(currentChat))
    setCurrentChat({ ...currentChatCopy, ...data })
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
    console.log("chat to be removed: ", chat)
    // const filteredChats = currentChatRooms.filter(room => room.room_id !== chat.room_id)
    // setCurrentChatRooms(filteredChats)
    // const currentChatCopy = JSON.parse(JSON.stringify(currentChat))
    // const chatStatusMessage = {
    //   admin_id: chat.admin_id,
    //   content: `Chat has ended`,
    //   id: uuidv4(),
    //   sender_type: "ChatStatus",
    //   visitor_id: chat.visitor_id
    // }
    // currentChatCopy.messages.push(chatStatusMessage)
    setCurrentChat({...chat})
  })

  const getRooms = () => {
    io.emit("getChats");
  };

  const initChat = () => {
    console.log("init chat")
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
        setActiveAdmins
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
