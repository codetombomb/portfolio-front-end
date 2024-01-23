import { useEffect, useContext, useRef, useState } from "react";
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
    activeAdmins,
    setActiveAdmins,
    isInputFocused, 
    setInputFocused
  } = useContext(ChatContext);

  const mainChatRef = useRef()

  useEffect(() => {
    if (mainChatRef.current) {
      mainChatRef.current.scrollTop = mainChatRef.current.scrollHeight;
    }
  }, [isInputFocused, currentChat.messages])


  const closeChat = (chat) => {
    io.emit("closeChat", chat);
    setCurrentChat({
      visitor_id: null,
      admin_id: null,
      room_id: "",
      chat_time_stamp: "",
      id: null,
      messages: [],
    });
    document.body.style.overflow = '';
  };

  if (isAdmin) {
    io.on("addAdminChat", (chat) => {
      const currentChatRoomsCopy = JSON.parse(JSON.stringify(currentChatRooms));
      currentChatRoomsCopy.push(chat);
      setCurrentChatRooms(currentChatRoomsCopy);
    });

    useEffect(() => {
      io.emit("setActiveAdmin", adminData);
      return () => {
        const filteredAdmins = activeAdmins.filter(
          (admin) => admin.id !== adminData.id
        );
        setActiveAdmins(filteredAdmins);
        closeChat(currentChat);
      };
    }, []);
  } else {
    useEffect(() => {
      return () => {
        closeChat(currentChat);
      };
    }, []);
  }

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setNewMessage(value);
  };

  const handleSendMessage = (e) => {
    if (e.target.name === "chat-form") {
      e.preventDefault();
    }
    if (!newMessage) return;

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
    setSelectedRoom(true);
    setCurrentChat({ ...JSON.parse(JSON.stringify(chat)) });
    joinRoom(chat.room_id, chat.id);
  };

  const handleCloseChatButton = (room) => {
    const newChatRooms = currentChatRooms.filter((chat) => chat.id !== room.id);
    setCurrentChatRooms(newChatRooms);
    closeChat(room);
  };

  const renderLiveChatButtons = () => {
    if (currentChatRooms.length === 0)
      return (
        <span className="grid grid-center" style={{ backgroundColor: `red` }}>
          No Active Chats
        </span>
      );
    return (
      <div className={style.chatRoomButtonGroup}>
        {currentChatRooms.map((room, index) => (
          <span key={uuidv4()}>
            <button
              className={
                currentChat.room_id === room.room_id ? style.selectedRoom : null
              }
              onClick={() => onChatRoomClick(room)}
            >
              {`Room ${index + 1}`}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseChatButton(room);
                }}
              >
                X
              </span>
            </button>
          </span>
        ))}
      </div>
    );
  };

  const renderAvailableAdmins = () => {
    return activeAdmins.map((admin) => {
      return (
        <button
          key={uuidv4()}
        >{`${admin.first_name} ${admin.last_name}`}</button>
      );
    });
  };

  const renderAvatar = () => {
    if (isAdmin) return null;
    return (
      <img
        className={style.tabAvatar}
        src={activeAdmins.length > 0 ? activeAdmins[0].picture : botAvatar}
        alt={`${activeAdmins.length > 0 ? "TomTobar" : "CodeTomBot"} Avatar`}
      />
    );
  };

  const renderMessages = () => {
    return currentChat.messages.map((message) => (
      <div key={uuidv4()} className={style.messageWrapper}>
        <p
          className={
            message.sender_type === "Admin"
              ? style.tomMessage
              : style.senderMessage
          }
        >
          {message.content}
        </p>
      </div>
    ));
  };

  const renderChatInput = () => {
    const chatInput = (
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
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
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
    );

    if (currentChat.is_active && !isAdmin) {
      return chatInput;
    } else if (currentChat.is_active && selectedRoom && isAdmin) {
      return chatInput;
    } else {
      return null;
    }
  };


  return (
    <section className={style.chatBox}>
      <section className={style.chatTab}>
        <div className={style.tabTitleGroup}>
          <>
            {renderAvatar()}
            <h3 className={style.tabTitle}>
              {activeAdmins.length > 0
                ? `${activeAdmins[0].name}`
                : "CodeTomBot"}
            </h3>
            <div className={style.onlineIndicator}></div>
          </>
        </div>
        <span
          className={style.chatCloseBtn}
          onClick={() => {
            closeChat(currentChat);
            handleSetShowChat();
          }}
        >
          close
        </span>
      </section>
      {isAdmin && renderLiveChatButtons()}
      {!isAdmin && renderAvailableAdmins()}
      <p className={style.chatDate}>{currentChat.chat_time_stamp}</p>
      <section className={style.mainChat}>
        <div ref={mainChatRef} className={style.messagesContainer}>{renderMessages()}</div>
      </section>
      {renderChatInput()}
    </section>
  );
};

export default ChatBox;
