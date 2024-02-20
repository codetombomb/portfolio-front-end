import React, { useRef } from "react";
import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";
import TextAnimationWrapper from "../TextAnimationWrapper";
import tomInSun from "../../assets/tom-in-sun.svg";
import { v4 as uuidv4 } from "uuid";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = ({ aboutSectionData }) => {
  const { descriptions } = aboutSectionData;
  const aboutMainRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(aboutMainRef.current, {
        scrollTrigger: {
          trigger: aboutMainRef.current,
          start: "top bottom",
          end: "+=300",
          scrub: true,
        },
        delay: .2,
        duration: .5,
        y: "70px",
        opacity: 0,
      });
    },
    { scope: aboutMainRef }
  );

  const renderDescriptions = () => {
    return descriptions.map((desc) => {
      return (
        <div className={style.aboutDesc} key={uuidv4()}>
          <SectionTitle title={desc.title.text} color={desc.title.color} />
          <SectionDescription
            text={desc.description.text}
            color={desc.description.color}
          />
        </div>
      );
    });
  };

  return (
    <section className={style.aboutSection}>
      <section className={style.aboutMain} ref={aboutMainRef}>
        <article className={style.headline}>{renderDescriptions()}</article>
        <div className={style.tomInSunWrapper}>
          <img className={style.tomInSun} src={tomInSun}></img>
        </div>
      </section>
    </section>
  );
};

export default AboutSection;
