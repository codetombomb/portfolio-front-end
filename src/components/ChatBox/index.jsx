import { useState, useEffect, useContext } from "react";
import style from "./styles.module.css";
import submitIcon from "../../assets/submit-icon.svg";
import { v4 as uuidv4 } from "uuid";
import botAvatar from "../../assets/bot.svg";
import { ChatContext } from "../../context/chatContext";

const ChatBox = ({ handleSetShowChat, isAdmin, adminData, onAdminLogout }) => {
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
    getRooms,
    activeAdmins,
    setActiveAdmins
  } = useContext(ChatContext);


  if (isAdmin) {
    useEffect(() => {
      console.log("Running useEffect")
      io.emit("setActiveAdmin", adminData)
      return () => {
        const filteredAdmins = activeAdmins.filter(admin => admin.id !== adminData.id)
        setActiveAdmins(filteredAdmins)
        closeChat(currentChat)
      }
    }, [])
  } else {
    useEffect(() => {
      console.log("Running visitor useEffect")
      return () => {
        console.log("Closing visitor chat", currentChat)
        closeChat(currentChat)
      }
    }, [])

  }

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

  const joinRoom = (room_id, chat_id) => {
    io.emit("joinRoom", room_id, chat_id);
  };

  const onChatRoomClick = (chat) => {
    setCurrentChat({ ...JSON.parse(JSON.stringify(chat)) })
    joinRoom(chat.room_id, chat.id);
  };

  const renderLiveChatButtons = () => {
    return (
      <div className={style.chatRoomButtonGroup}>
        {currentChatRooms.map((room, index) => (
          <>
            <button
              key={room.room_id}
              onClick={() => onChatRoomClick(room)}
            >{`Room ${index + 1}`}             <span onClick={() => {
              const newChatRooms = currentChatRooms.filter(chat => chat.id !== room.id)
              setCurrentChatRooms(newChatRooms)
              closeChat(room)
            }}>X</span></button>

          </>
        ))}
      </div>
    );
  };

  const renderAvailableAdmins = () => {
    return (activeAdmins.map(admin => {
      return <button
        key={`admin-${admin.id}`}
      >{`${admin.first_name} ${admin.last_name}`}</button>
    }))
  }

  const renderAvatar = () => {
    if (isAdmin) return null
    return (
      <img
        className={style.tabAvatar}
        src={activeAdmins.length > 0 ? activeAdmins[0].picture : botAvatar}
        alt={`${activeAdmins.length > 0 ? "TomTobar" : "CodeTomBot"} Avatar`}
      />
    )
  }

  const closeChat = (chat) => {
    console.log("closing chat", chat)
    io.emit("closeChat", chat)
    setCurrentChat({
      visitor_id: null,
      admin_id: null,
      room_id: "",
      chat_time_stamp: "",
      id: null,
      messages: []
    })
  }

  return (
    <section className={style.chatBox}>
      <section className={style.chatTab}>
        <div className={style.tabTitleGroup}>
          <>
            {renderAvatar()}
            <h3 className={style.tabTitle}>
              {activeAdmins.length > 0 ? `${activeAdmins[0].name}` : "CodeTomBot"}
            </h3>
            <div
              className={style.onlineIndicator}
            ></div>
          </>
        </div>
        <span className={style.chatCloseBtn} onClick={() => {
          closeChat(currentChat)
          handleSetShowChat()
        }}>
          close
        </span>
      </section>
      {isAdmin && renderLiveChatButtons()}
      {!isAdmin && renderAvailableAdmins()}
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
