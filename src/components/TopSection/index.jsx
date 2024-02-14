import { useContext } from "react";

import HeroImage from "../HeroImage";
import Navbar from "../Navbar";
import SectionCallToAction from "../SectionCallToAction";
import SectionDescription from "../SectionDescription";
import SectionTitle from "../SectionTitle";

import style from "./styles.module.css";
import { ChatContext } from "../../context/chatContext";
import SectionSubTitle from "../SectionSubTitle";
import TextAnimationWrapper from "../TextAnimationWrapper";
import SideBar from "../SideBar";
import PageSelection from "../PageSelection";
import MenuButton from "../MenuButton";

const TopSection = ({ handleSetShowChat, showChat, topSectionData, isAdmin, navData }) => {
  const { title, subTitle, description, callToAction, heroImage } = topSectionData;
  const { initChat, getRooms, currentChat, setCurrentChat, io } = useContext(ChatContext)

  return (
    <section className={style.topSection}>
      <div className={style.menuButtonWrapper}>
        <MenuButton />
      </div>
      <SideBar />
      <section className={style.sidebar}>
        <PageSelection />
        <div className={style.heroImgWrapper}>
          <HeroImage />
        </div>
      </section>
      <section className={style.topMain}>
        <article className={style.headline}>
          <TextAnimationWrapper delay={.25} duration={.5}>
            <div className={style.headlineTitleWrapper}>
              <SectionTitle title={title.text} color={title.color} fontSize={"4vw"} padding={"0"} />
            </div>
          </TextAnimationWrapper>
          <TextAnimationWrapper delay={.5} duration={.4}>
            <div className={style.headlineDescriptionWrapper}>
              <SectionDescription text={description.text} color={description.color} />
            </div>
          </TextAnimationWrapper>
          <SectionCallToAction
            handleButtonClick={() => {
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
            backgroundColor={callToAction.backgroundColor}
          />
        </article>
      </section>
    </section>
  )


};

export default TopSection;