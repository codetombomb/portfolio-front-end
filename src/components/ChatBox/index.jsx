import { useEffect, useContext, useRef, useState } from "react";
import style from "./styles.module.css";
import submitIcon from "../../assets/submit-icon.svg";
import { v4 as uuidv4 } from "uuid";
import botAvatar from "../../assets/bot.svg";
import { ChatContext } from "../../context/chatContext";
import useDebounce from "../../hooks/useDebounce";

const ChatBox = ({ handleSetShowChat }) => {
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
    setInputFocused,
    setIsTyping,
    currentTypers,
    currentAdmin,
    isAdmin,
    chatTime
  } = useContext(ChatContext);

  const mainChatRef = useRef();
  const typingTimeoutRef = useRef(null);
  const debouncedMessage = useDebounce(newMessage, 500);

  useEffect(() => {
    if (mainChatRef.current) {
      mainChatRef.current.scrollTop = mainChatRef.current.scrollHeight;
    }
  }, [isInputFocused, currentChat.messages]);

  useEffect(() => {
    if (debouncedMessage) {
      io.emit("stopped typing", currentAdmin.first_name, currentChat.room_id);
    }
  }, [debouncedMessage]);

  const closeChat = (chat) => {
    const newChatRooms = currentChatRooms.filter((c) => c.id !== chat.id);
    setCurrentChatRooms(newChatRooms);
    const timeSent = new Date().toISOString();
    io.emit("closeChat", chat, timeSent);
    setCurrentChat({
      visitor_id: null,
      admin_id: null,
      room_id: "",
      chat_time_stamp: Intl.DateTimeFormat('en', { weekday: "short", hour: "numeric", minute: "numeric", hour12: true }).format(new Date()),
      id: null,
      messages: [],
      is_active: true
    })
  };

  if (isAdmin) {
    io.on("addAdminChat", (chat) => {
      const currentChatRoomsCopy = JSON.parse(JSON.stringify(currentChatRooms));
      currentChatRoomsCopy.push(chat);
      setCurrentChatRooms(currentChatRoomsCopy);
    });

    useEffect(() => {
      io.emit("setActiveAdmin", currentAdmin);
      return () => {
        const filteredAdmins = activeAdmins.filter(
          (admin) => admin.id !== currentAdmin.id
        );
        setActiveAdmins(filteredAdmins);
      };
    }, []);
  } else {
    useEffect(() => {
      return () => {
        const timeSent = new Date().toISOString();
        closeChat(currentChat, timeSent);
      };
    }, []);
  }

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setNewMessage(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (value) {
      setIsTyping(true);
      io.emit(
        "typing",
        { name: isAdmin ? currentAdmin.name : "visitor" },
        currentChat.room_id
      );
      typingTimeoutRef.current = setTimeout(() => {
        io.emit(
          "stopped typing",
          isAdmin ? currentAdmin.name : "visitor",
          currentChat.room_id
        );
      }, 500);
    }
  };

  const handleSendMessage = (e) => {
    if (e.target.name === "chat-form") {
      e.preventDefault();
    }
    if (!newMessage) return;

    const timeSent = new Date().toISOString();

    io.emit(
      "sendMessage",
      newMessage,
      currentChat.room_id,
      currentChat,
      isAdmin,
      timeSent
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
                `roomButton ${currentChat.room_id === room.room_id ? style.selectedRoom : null}`
              }
              onClick={() => onChatRoomClick(room)}
            >
              {`Room ${index + 1}`}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  closeChat(room);
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

  const renderAvatar = () => {
    if (isAdmin) return null;
    return (
      <img
        className={style.tabAvatar}
        src={currentAdmin.picture}
        alt={`${currentAdmin.name} Avatar`}
      />
    );
  };

  // Need a more cost effective way to handle this - running every new
  const parseIsoTime = (isoTime) => {
    const newDateString = new Date(isoTime);
    if (isoTime.endsWith('Z')) {
      return newDateString.toLocaleString("en", { hour: "numeric", minute: "numeric", hour12: true });
    } else {
      const timeZoneOffset = newDateString.getTimezoneOffset() * 60000;
      const localDate = new Date(newDateString.getTime() - timeZoneOffset);
      return localDate.toLocaleString("en", { hour: "numeric", minute: "numeric", hour12: true });
    }
  }

  const renderMessages = () => {
    return currentChat.messages.map((message) => {
      if (message.sender_type === "Update") {
        return <span className={style.messageData} key={message.id}>{message.content}</span>
      }
      const timeSent = parseIsoTime(message.created_at)
      return (
        <div key={uuidv4()} className={style.messageWrapper}>
          <div
            className={`${style.messageContent} ${message.sender_type === "Admin" || message.sender_type === "Bot" ? style.tomMessageContent : null
              }`}
          >
            <span className={style.messageData}>
              {timeSent}
            </span>
            <p
              className={`${style.message} ${message.sender_type === "Admin" || message.sender_type === "Bot"
                ? style.tomMessage
                : style.senderMessage
                }`}
            >
              {message.content}
            </p>
          </div>
        </div>
      );
    });
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
          autoComplete="off"
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

  const renderCurrentTypers = () => {
    if (currentTypers.length === 1) {
      return <p className={style.currentTypers}>{`${currentTypers[0]} is typing...`}</p>;
    } else {
      return <p className={style.currentTypers}>{`${currentTypers.length} people are typing...`}</p>;
    }
  };

  return (
    <section className={style.chatBox}>
      <section className={style.chatTab}>
        <div className={style.tabTitleGroup}>
          <>
            {renderAvatar()}
            <h3 className={style.tabTitle}>
              {currentAdmin.name}
            </h3>
            <div className={style.onlineIndicator}></div>
          </>
        </div>
        <span
          className={style.chatCloseBtn}
          onClick={() => {
            if (!isAdmin) closeChat(currentChat);
            handleSetShowChat();
          }}
        >
          close
        </span>
      </section>
      {isAdmin && renderLiveChatButtons()}
      <p className={style.chatDate}>{chatTime}</p>
      <section className={style.mainChat}>
        <div ref={mainChatRef} className={style.messagesContainer}>
          {renderMessages()}
        </div>
        {currentTypers.length > 0 ? renderCurrentTypers() : null}
      </section>
      {renderChatInput()}
    </section>
  );
};

export default ChatBox;