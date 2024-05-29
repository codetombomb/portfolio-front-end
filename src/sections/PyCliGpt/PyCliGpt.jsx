import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import SocialIcon from "../../components/SocialIcon/SocialIcon";
import githubIcon from "../../assets/github.svg";

function PyCliGpt() {
  const robotLazerRef = useRef(null);
  const [_, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={`section ${styles.workTwo}`}>
      <div className={`${styles.workTwoTitleWrapper}`}>
        <h1 className={styles.workTwoTitle}>py-cli</h1>
        <h1 className={styles.workTwoTitle}>gpt</h1>
      </div>
      <div className={styles.robotImgContainer}>
        <img
          className={styles.zebraPrint}
          src="./zebra-print.webp"
          alt="Zebra print background"
        />
        <img
          className={styles.robotImg}
          src="./robot-laser.webp"
          alt="Purple robot shooting a surf green beam out of its eyes"
        />
        <div
          className={`${styles.workTwoDescription} flex-column flex-space-between`}
        >
          <h1 className={styles.w2mainTitle}>AI Powered Command Line Chat</h1>
          <p className={styles.w2mainDescription}>
            PyCli-GPT is a Python CLI using OpenAI's GPT to answer questions and
            assist with tasks. Clone, set up your API key, and start exploring!
          </p>
          <SocialIcon
            iconName="github"
            icon={githubIcon}
            handleIconClick={() =>
              window.open("https://github.com/codetombomb/cli-gpt", "_blank")
            }
          />
        </div>
      </div>
    </section>
  );
}

export default PyCliGpt;
