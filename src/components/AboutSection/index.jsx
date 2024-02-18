import React from "react";
import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";
import TextAnimationWrapper from "../TextAnimationWrapper";
import slime from "../../assets/slime.svg"
import tomInSun from "../../assets/tom-in-sun.svg"
import { v4 as uuidv4 } from "uuid";

const AboutSection = ({ aboutSectionData }) => {
  const { descriptions } = aboutSectionData;

  const renderDescriptions = () => {
    return descriptions.map((desc) => {
      return (
        <div className={style.aboutDesc} key={uuidv4()}>
          <SectionTitle title={desc.title.text} color={desc.title.color} />
          <SectionDescription text={desc.description.text} color={desc.description.color} />
        </div>
      )
    })
  }

  return (
    <section className={style.aboutSection}>
      <div className={style.slimeContainer}>
        <img className={style.slime} src={slime} alt="slime" />
      </div>
      <section className={style.aboutMain}>
        <article className={style.headline}>
          {renderDescriptions()}
        </article>
        <div className={style.tomInSunWrapper}>
          <img className={style.tomInSun} src={tomInSun}></img>
        </div>

      </section>
    </section>
  )
};

export default AboutSection;
