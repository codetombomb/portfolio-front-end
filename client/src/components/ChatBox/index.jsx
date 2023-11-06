import style from "./styles.module.css";
import submitIcon from "../../assets/submit-icon.svg";
import { v4 as uuidv4 } from "uuid";

const ChatBox = ({ handleSetShowChat, avatar }) => {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const today = new Date();

  const chatMessages = [
    { id: uuidv4(), isTom: false, content: "Hello?" },
    { id: uuidv4(), isTom: true, content: "Hey there! This is Tom! How do you like the site?"},
    { id: uuidv4(), isTom: false, content: "Its alright..."},
    { id: uuidv4(), isTom: false, content: "Ive seen better 🤷‍♂️"},
  ];

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
      ${today.getHours() - 12}:${today.getMinutes()} 
      ${today.getHours() > 12 ? "PM" : "AM"}`}</p>
        <div className={style.messagesContainer}>
          {chatMessages.map(message => <div key={message.id} className={style.messageWrapper}>
            <p className={message.isTom ? style.tomMessage : style.senderMessage}>{message.content}</p>
          </div>)}
        </div>
      </section>
      <section className={style.chatInputGroup}>
        <input className={style.chatInput} type="text" placeholder="Aa" />
        <img src={submitIcon} alt="submit arrow icon" />
      </section>
    </section>
  );
};

export default ChatBox;
