import HeroImage from "../HeroImage";
import Navbar from "../Navbar";
import SectionCallToAction from "../SectionCallToAction";
import SectionDescription from "../SectionDescription";
import SectionTitle from "../SectionTitle";

import style from "./styles.module.css";

const TopSection = ({ handleSetShowChat, topSectionData }) => {
  const { title, description, callToAction, heroImage } = topSectionData;
  return (
    <section className={style.topSection}>
      <Navbar />
      <SectionTitle title={title.text} color={title.color} />
      <SectionDescription text={description.text} color={description.color} />
      <SectionCallToAction
        handleButtonClick={handleSetShowChat}
        text={callToAction.text}
        color={callToAction.color}
      />
      <HeroImage imageSrc={heroImage.source} />
    </section>
  );
};

export default TopSection;
