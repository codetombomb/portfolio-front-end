import React from "react";
import style from './styles.module.css'

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";
import SectionCallToAction from "../SectionCallToAction";

const AboutSection = () => {
  return (
    <div className={style.aboutSection}>
      <SectionTitle title={"about"} color="--primary-light" />
      <SectionDescription
        text="Hi, I'm Tom and I am obsessed with code! For the passed two years, I have been teaching Full-Stack Web Development at Flatiron School. I love crafting designs and then breathing life into them with code tools."
        color="--secondary-light"
      />
      <SectionCallToAction text="Learn More!" color="--primary-light" />
    </div>
  );
};

export default AboutSection;
