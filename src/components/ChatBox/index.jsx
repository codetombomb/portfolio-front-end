import { useEffect, useContext, useRef, useState } from "react";
import style from "./styles.module.css";
import submitIcon from "../../assets/submit-icon.svg";
import { v4 as uuidv4 } from "uuid";
import botAvatar from "../../assets/bot.svg";
import { ChatContext } from "../../context/chatContext";
import useDebounce from "../../hooks/useDebounce";

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
    setInputFocused,
    isTyping,
    setIsTyping,
    currentTypers,
    setCurrentTypers,
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
      io.emit("stopped typing", adminData.first_name, currentChat.room_id);
    }
  }, [debouncedMessage]);

  const closeChat = (chat) => {
    io.emit("closeChat", chat, "from chat box line 47");
    setCurrentChat({
      visitor_id: null,
      admin_id: null,
      room_id: "",
      chat_time_stamp: "",
      id: null,
      messages: [],
    });
    document.body.style.overflow = "";
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
        // closeChat(currentChat);
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
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (value) {
      setIsTyping(true);
      io.emit(
        "typing",
        { name: adminData.first_name || "visitor" },
        currentChat.room_id
      );
      typingTimeoutRef.current = setTimeout(() => {
        io.emit(
          "stopped typing",
          adminData.first_name || "visitor",
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

    // const timeSent = Intl.DateTimeFormat("en", {
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true,
    // }).format(new Date());

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

  const handleCloseChatButton = (room) => {
    const newChatRooms = currentChatRooms.filter((chat) => chat.id !== room.id);
    setCurrentChatRooms(newChatRooms);
    closeChat(room, "from chat box line 146");
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

  // Need a more cost effective way to handle this - running every new
  const parseIsoTime = (isoTime) => {
    const newDateString = new Date(isoTime)
      const timeZoneOffset = newDateString.getTimezoneOffset() * 60000
      const localDate = new Date(newDateString.getTime() - timeZoneOffset)
      return localDate.toLocaleString("en", {hour: "numeric", minute: "numeric", hour12: true})
  }

  const renderMessages = () => {
    return currentChat.messages.map((message) => {
      const timeSent = parseIsoTime(message.created_at)
      console.log(message)
      return (
        <div key={uuidv4()} className={style.messageWrapper}>
          <div
            className={`${style.messageContent} ${
              message.sender_type === "Admin" ? style.tomMessageContent : null
            }`}
          >
            <span className={style.messageTimeStamp}>
              {timeSent}
            </span>
            <p
              className={`${style.message} ${
                message.sender_type === "Admin"
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
      return `${currentTypers[0]} is typing...`;
    } else {
      return `${currentTypers.length} people are typing...`;
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
            if(!isAdmin)closeChat(currentChat);
            handleSetShowChat();
          }}
        >
          close
        </span>
      </section>
      {isAdmin && renderLiveChatButtons()}
      <p className={style.chatDate}>{currentChat.chat_time_stamp}</p>
      <section className={style.mainChat}>
        <div ref={mainChatRef} className={style.messagesContainer}>
          {renderMessages()}
          <p className={style.currentTypers}>
            {currentTypers.length > 0 ? renderCurrentTypers() : null}
          </p>
        </div>
      </section>
      {renderChatInput()}
    </section>
  );
};

export default ChatBox;
