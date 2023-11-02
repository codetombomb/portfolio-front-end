import React from "react";
import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";
import SectionCallToAction from "../SectionCallToAction";

const AboutSection = ({ aboutSectionData }) => {
  const { title, description, callToAction } = aboutSectionData;
  return (
    <section className={style.aboutSection}>
      <SectionTitle title={title.text} color={title.color} />
      <SectionDescription text={description.text} color={description.color} />
      <SectionCallToAction text={callToAction.text} color={callToAction.color} />
    </section>
  );
};

export default AboutSection;
