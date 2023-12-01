import { useContext } from "react";

import HeroImage from "../HeroImage";
import Navbar from "../Navbar";
import SectionCallToAction from "../SectionCallToAction";
import SectionDescription from "../SectionDescription";
import SectionTitle from "../SectionTitle";

import style from "./styles.module.css";
import { ChatContext } from "../../context/chatContext";

const TopSection = ({ handleSetShowChat, showChat, topSectionData, isAdmin }) => {
  const { title, description, callToAction, heroImage } = topSectionData;
  const { initChat, getRooms, currentChat, setCurrentChat, io } = useContext(ChatContext)

  return (
    <section className={style.topSection}>
      <Navbar />
      <SectionTitle title={title.text} color={title.color} />
      <SectionDescription text={description.text} color={description.color} />
      <SectionCallToAction
        handleButtonClick={() => {
          if (isAdmin) {
            console.log("Running isAdmin get rooms")
            getRooms()
          } else if (!isAdmin && !showChat) {
            initChat()
          } else if (!isAdmin && showChat) {
            console.log("3rd else if")
            io.emit("closeChat", currentChat)
            setCurrentChat({
              visitor_id: null,
              admin_id: null,
              room_id: "",
              chat_time_stamp: "",
              id: null,
              messages: []
            })
          }
          handleSetShowChat()
        }}
        text={callToAction.text}
        color={callToAction.color}
      />
      <HeroImage imageSrc={heroImage.source} />
    </section>
  );
};

export default TopSection;
