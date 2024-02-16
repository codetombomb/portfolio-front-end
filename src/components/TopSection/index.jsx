import { useContext, useState } from "react";

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
import ContactMenu from "../ContactMenu";

const TopSection = ({
  handleSetShowChat,
  showChat,
  topSectionData,
  isAdmin,
  navData,
}) => {
  const { title, description, callToAction } = topSectionData;
  const { initChat, getRooms, currentChat, setCurrentChat, io } =
    useContext(ChatContext);
  const [clicked, setClicked] = useState(false);

  const handleMenuBtnClick = () => {
    setClicked((prev) => !prev);
  };

  const onLiveChatClick = () => {
    handleSetShowChat();
    if (isAdmin && !showChat) {
      getRooms();
    } else if (!isAdmin && !showChat) {
      initChat();
    } else if (showChat) {
      const timeSent = new Date().toISOString();
      io.emit("closeChat", currentChat, timeSent);
      setCurrentChat({
        visitor_id: null,
        admin_id: null,
        room_id: "",
        chat_time_stamp: "",
        id: null,
        messages: [],
      });
    }
  };

  return (
    <section className={style.topSection}>
      <div className={style.topMain}>
        {/* <SideBar /> */}
        <section className={style.sidebar}>
          <PageSelection />
        </section>
        <section className={style.topMain}>
          <article className={style.headline}>
            <TextAnimationWrapper delay={0.25} duration={0.5}>
              <SectionTitle title={title.text} color={title.color} />
            </TextAnimationWrapper>
            <TextAnimationWrapper delay={0.5} duration={0.4}>
              <div className={style.headlineDescriptionWrapper}>
                <SectionDescription
                  text={description.text}
                  color={description.color}
                  style={{ textAlign: "center" }}
                />
              </div>
            </TextAnimationWrapper>
          </article>
          <div className={style.heroImgWrapper}>
            <HeroImage />
          </div>
          <SectionCallToAction
            handleButtonClick={onLiveChatClick}
            text={callToAction.text}
            color={callToAction.color}
            backgroundColor={callToAction.backgroundColor}
          />
        </section>
      </div>
    </section>
  );
};

export default TopSection;
