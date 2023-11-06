import { useState, useEffect } from 'react'
import style from "./styles.module.css";
import submitIcon from "../../assets/submit-icon.svg";
import socketIOClient from 'socket.io-client'

const ChatBox = ({ handleSetShowChat, avatar }) => {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const today = new Date();

  // const chatMessages = [{ id: 1, sent: Date.now() }];
  const [chatMessages, setChatMessages] = useState([])

  const socketio = socketIOClient("http://localhost:3001")

  useEffect(() => {
    socketio.on("chat", chatMessages => {
      setChatMessages(chatMessages)
    })
  }, [])

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
      <section className={style.mainChat}>{`
      ${days[today.getDay()]} 
      ${today.getHours() - 12}:${today.getMinutes()} 
      ${today.getHours() > 12 ? "PM" : "AM"}`}</section>
      <section className={style.chatInputGroup}>
        <input className={style.chatInput} type="text" placeholder="Aa" />
        <img src={submitIcon} alt="submit arrow icon" />
      </section>
    </section>
  );
};

export default ChatBox;
