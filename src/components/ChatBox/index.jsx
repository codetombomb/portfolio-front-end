import { useState, useEffect } from "react";
import style from "./styles.module.css";
import submitIcon from "../../assets/submit-icon.svg";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import botAvatar from "../../assets/bot.svg";

const ChatBox = ({ handleSetShowChat, isAdmin, adminData }) => {
  const [newMessage, setNewMessage] = useState("");
  const [currentChatRooms, setCurrentChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentChat, setCurrentChat] = useState({
    roomId: "",
    initialTime: "",
    messages: [],
  });

  const socketio = socketIOClient("https://portfolio-front-end-c982.onrender.com");
  socketio.on("chatData", (data) => {
    console.log("Resetting data")
    setCurrentChat({ ...data });
  });

  useEffect(() => {
    if (isAdmin) {
      socketio.emit("adminLogin");
      socketio.on("adminChats", (data) => {
        setCurrentChatRooms(data);
      });
    } else {
      socketio.emit("initChat");
    }
    return () => {
      socketio.off("adminLogin");
      socketio.off("adminChats");
    };
  }, []);

  // const codeTomBotChat = () => {
  //   const codeTomBotMessage = { id: uuidv4(), isTom: isAdmin, content: "Hey there! This is Code Tom Bot. Hang tight and I will get Tom for ya! :-)" }
  //   socketio.emit("chat", [...chatMessages, codeTomBotMessage], socketio.id)
  //   // setChatMessages([...chatMessages, codeTomBotMessage])
  // }

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setNewMessage(value);
  };

  const handleSendMessage = (e) => {
    if (e.target.name === "chat-form") {
      e.preventDefault();
    }
    const newMessageData = {
      id: uuidv4(),
      isTom: isAdmin,
      content: newMessage,
    };

    socketio.emit(
      "sendMessage",
      newMessageData,
      isAdmin ? selectedRoom : currentChat.roomId
    );

    const currentChatCopy = JSON.parse(JSON.stringify(currentChat));
    currentChatCopy.messages.push(newMessageData);
    setCurrentChat(currentChatCopy);
    setNewMessage("");
  };

  const joinRoom = (roomId) => {
    const activeChat = currentChatRooms.find((room) => room.roomId === roomId);
    setCurrentChat(activeChat);
    socketio.emit("joinRoom", roomId);
  };

  const onChatRoomClick = (room) => {
    joinRoom(room);
    setSelectedRoom(room);
  };

  const renderLiveChatButtons = () => {
    return (
      <div className={style.chatRoomButtonGroup}>
        {currentChatRooms.map((room, index) => (
          <button
            key={room.roomId}
            onClick={() => onChatRoomClick(room.roomId)}
          >{`Room ${index + 1}`}</button>
        ))}
      </div>
    );
  };

  return (
    <section className={style.chatBox}>
      <section className={style.chatTab}>
        <div className={style.tabTitleGroup}>
          <>
            <img
              className={style.tabAvatar}
              src={isAdmin ? adminData.picture : botAvatar}
              alt={`${isAdmin ? "Tom Tobar" : "Code Tom Bot"} Avatar`}
            />
            <h3 className={style.tabTitle}>
              {isAdmin ? `${adminData.name}` : "Code Tom Bot"}
            </h3>
            <div
              className={style.onlineIndicator}
              style={{
                backgroundColor: isAdmin
                  ? "var(--primary-light)"
                  : "rgba(255, 0, 0, 0)",
              }}
            ></div>
          </>
        </div>
        <span className={style.chatCloseBtn} onClick={handleSetShowChat}>
          close
        </span>
      </section>
      {isAdmin && renderLiveChatButtons()}
      <section className={style.mainChat}>
        <p className={style.chatDate}>{currentChat.initialTime}</p>
        <div className={style.messagesContainer}>
          {currentChat.messages.map((message) => (
            <div key={message.id} className={style.messageWrapper}>
              <p
                className={
                  message.isTom ? style.tomMessage : style.senderMessage
                }
              >
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </section>
      <form
        name="chat-form"
        className={style.chatInputGroup}
        onSubmit={handleSendMessage}
      >
        <input
          className={style.chatInput}
          type="text"
          name="newMessage"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Aa"
        />
        <img
          className={style.submitIcon}
          src={submitIcon}
          alt="submit arrow icon"
          onClick={handleSendMessage}
        />
        <input type="submit" style={{ display: "none" }} />
      </form>
    </section>
  );
};

export default ChatBox;
