import { useState, useEffect } from "react";
import style from "./styles.module.css";
import submitIcon from "../../assets/submit-icon.svg";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const ChatBox = ({handleSetShowChat, avatar }) => {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const today = new Date();

  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const socketio = socketIOClient("http://localhost:3001");

  useEffect(() => {
    socketio.on("chat", (chatMessages) => {
      setChatMessages(chatMessages);
    });
  }, []);

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setNewMessage(value);
  };

  const emitChat = (chat) => {
    socketio.emit("chat", chat);
  };

  const addNewChat = (e) => {
    if(e.target.name === "chat-form"){
      e.preventDefault()
    }
    const newChat = [
      ...chatMessages,
      { id: uuidv4(), isTom: true, content: newMessage },
    ];
    setChatMessages(newChat);
    emitChat(newChat);
    setNewMessage("");
  };

  const renderMinutes = () => {
    let currentMins = today.getMinutes().toString()
    return currentMins.toString().length < 2 ? ("0" + currentMins).slice(-2) : currentMins
  }

  return (
    <section className={style.chatBox}>
      <section className={style.chatTab}>
        <div className={style.tabTitleGroup}>
          <>
            <img
              className={style.tabAvatar}
              src={avatar}
              alt="Tom Tobar Avatar"
            />
            <h3 className={style.tabTitle}>Tom Tobar</h3>
            <div className={style.onlineIndicator}></div>
          </>
        </div>
        <span className={style.chatCloseBtn} onClick={handleSetShowChat}>
          close
        </span>
      </section>
      <section className={style.mainChat}>
        <p className={style.chatDate}>{`
      ${days[today.getDay()]} 
      ${Math.abs(12 - today.getHours())}:${renderMinutes()} 
      ${today.getHours() > 12 ? "PM" : "AM"}`}</p>
        <div className={style.messagesContainer}>
          {chatMessages.map((message) => (
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
      <form name="chat-form" className={style.chatInputGroup} onSubmit={addNewChat}>
        <input
          className={style.chatInput}
          type="text"
          name="newMessage"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Aa"
        />
        <img className={style.submitIcon} src={submitIcon} alt="submit arrow icon" onClick={addNewChat} />
        <input type="submit" style={{ display: "none" }} />
      </form>
    </section>
  );
};

export default ChatBox;
