import React from "react";
import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";
import SectionCallToAction from "../SectionCallToAction";
import TextAnimationWrapper from "../TextAnimationWrapper";

const AboutSection = ({ aboutSectionData }) => {
  const { title, description, callToAction } = aboutSectionData;
  return (
    <section className={style.aboutSection}>
      <TextAnimationWrapper delay={.6} duration={.5}>
        <SectionTitle title={title.text} color={title.color} />
      </TextAnimationWrapper>
      <TextAnimationWrapper delay={.9} duration={.4}>
        <SectionDescription text={description.text} color={description.color} />
      </TextAnimationWrapper>
      <SectionCallToAction text={callToAction.text} color={callToAction.color} />
    </section>
  );
};

export default AboutSection;
