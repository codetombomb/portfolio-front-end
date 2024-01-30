import { useContext } from "react";

import HeroImage from "../HeroImage";
import Navbar from "../Navbar";
import SectionCallToAction from "../SectionCallToAction";
import SectionDescription from "../SectionDescription";
import SectionTitle from "../SectionTitle";

import style from "./styles.module.css";
import { ChatContext } from "../../context/chatContext";

const TopSection = ({ handleSetShowChat, showChat, topSectionData, isAdmin, navData }) => {
  const { title, description, callToAction, heroImage } = topSectionData;
  const { initChat, getRooms, currentChat, setCurrentChat, io } = useContext(ChatContext)

  return (
    <section className={style.topSection}>
      <Navbar navData={navData}/>
      <SectionTitle title={title.text} color={title.color} />
      <SectionDescription text={description.text} color={description.color} />
      <SectionCallToAction
        handleButtonClick={() => {
          if(typeof screen.orientation !== 'undefined'){
            document.body.style.overflow = 'hidden';
          }
          handleSetShowChat()
          if (isAdmin && !showChat) {
            getRooms()
          } else if (!isAdmin && !showChat) {
            initChat()
          } else if (showChat) {
            const timeSent = new Date().toISOString();
            io.emit("closeChat", currentChat, timeSent)
            setCurrentChat({
              visitor_id: null,
              admin_id: null,
              room_id: "",
              chat_time_stamp: "",
              id: null,
              messages: []
            })
          }
        }}
        text={callToAction.text}
        color={callToAction.color}
      />
      <HeroImage imageSrc={heroImage.source} />
    </section>
  );
};

export default TopSection;
