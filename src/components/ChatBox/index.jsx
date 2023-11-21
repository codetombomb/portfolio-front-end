import { useState, useEffect, useContext } from "react";
import style from "./styles.module.css";
import submitIcon from "../../assets/submit-icon.svg";
import { v4 as uuidv4 } from "uuid";
import botAvatar from "../../assets/bot.svg";
import { ChatContext } from "../../context/chatContext";

const ChatBox = ({ handleSetShowChat, isAdmin, adminData }) => {
  const {
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
  } = useContext(ChatContext);


  const handleInputChange = ({ target }) => {
    const { value } = target;
    setNewMessage(value);
  };

  const handleSendMessage = (e) => {
    if (e.target.name === "chat-form") {
      e.preventDefault();
    }

    const newMessageData = {
      isTom: isAdmin,
      content: newMessage,
    };

    io.emit(
      "sendMessage",
      newMessage,
      currentChat.room_id,
      currentChat,
      isAdmin
    );

    setNewMessage("");
  };

  const joinRoom = (room_id) => {
    io.emit("joinRoom", room_id);
  };

  const onChatRoomClick = (chat) => {
    const activeChat = currentChatRooms.find((room) => room.room_id === chat.room_id);
    setCurrentChat({...JSON.parse(JSON.stringify(activeChat))})
    joinRoom(chat.room_id);
  };

  const renderLiveChatButtons = () => {
    return (
      <div className={style.chatRoomButtonGroup}>
        {currentChatRooms.map((room, index) => (
          <button
            key={room.room_id}
            onClick={() => onChatRoomClick(room)}
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
        <span className={style.chatCloseBtn} onClick={() => {
          io.emit("closeChat", currentChat)
          setCurrentChat({
            visitor_id: null,
            admin_id: null,
            room_id: "",
            chat_time_stamp: "",
            id: null,
            messages: []
        })
          handleSetShowChat()
        }}>
          close
        </span>
      </section>
      {isAdmin && renderLiveChatButtons()}
      <section className={style.mainChat}>
        <p className={style.chatDate}>{currentChat.chat_time_stamp}</p>
        <div className={style.messagesContainer}>
          {currentChat.messages.map((message) => (
            <div key={message.id} className={style.messageWrapper}>
              <p
                className={
                  message.sender_type === "Admin" ? style.tomMessage : style.senderMessage
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
