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
    <section className={`section ${styles.workTwo} `}>
      <h1>py-cli</h1>
      <h1>gpt</h1>
      <div className={styles.bgImgWrapper}>
        <div ref={robotLazerRef} className={styles.robotLazerWrapper}>
          <img
            className={styles.robotImg}
            src="./robot.png"
            alt="Purple robot shooting an surf green beam out of its eyes"
          />
          <div className={styles.eyeDot}></div>
        </div>
      </div>
      <SocialIcon
        iconName="github"
        icon={githubIcon}
        handleIconClick={() =>
          window.open("https://github.com/codetombomb/cli-gpt", "_blank")
        }
      />
    </section>
  );
}

export default PyCliGpt;
