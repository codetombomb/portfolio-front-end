import React, { useState, useEffect, useContext } from 'react'
import { ChatContext } from '../../context/chatContext'
import { v4 as uuidv4 } from 'uuid'
import style from './styles.module.css'

const Message = ({ delay }) => {
  const [renderedMessages, setRenderedMessages] = useState([])
  const [nextIndex, setNextIndex] = useState(0)
  const { currentTypers, setCurrentTypers, isAdmin, currentAdmin, currentChat } = useContext(ChatContext)

  
  if (!isAdmin && currentAdmin.name === "CodeTomBot") {
    console.log("Running visitor useEffect")
    useEffect(() => {
      if (nextIndex < currentChat.messages.length) {
        setCurrentTypers(typers => [...typers, "CodeTomBot"])
        const timerId = setTimeout(() => {
          setRenderedMessages(currentMessages => [...currentMessages, currentChat.messages[nextIndex]])
          setNextIndex(currentIndex => currentIndex + 1)
          setCurrentTypers(currentTypers.filter(typer => typer !== "CodeTomBot"))
        }, delay)
        return () => clearTimeout(timerId)
      }
    }, [currentChat, delay, nextIndex])
  }

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

  return (
    <>{renderedMessages.map(message => {
      if (currentAdmin.name === "CodeTomBot")
        if (message.sender_type === "Update") {
          return <span className={style.messageTimeStamp} key={message.id}>{message.content}</span>
        }
      const timeSent = parseIsoTime(message.created_at)
      return (<div key={uuidv4()} className={style.messageWrapper}>
        <div
          className={`${style.messageContent} ${message.sender_type === "Admin" ? style.tomMessageContent : null
            }`}
        >
          <span className={style.messageTimeStamp}>
            {timeSent}
          </span>
          <p
            className={`${style.message} ${message.sender_type === "Admin"
              ? style.tomMessage
              : style.senderMessage
              }`}
          >
            {message.content}
          </p>
        </div>
      </div>)
    })}</>
  )
}

export default Message