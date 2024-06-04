import React from "react";
import ThreeCanvas from "../../components/ThreeCanvas/ThreeCanvas";
import LineBurst from "../../components/LineBurst/LineBurst";
import styles from "./styles.module.css";
import githubIcon from "../../assets/github.svg";
import SocialIcon from "../../components/SocialIcon/SocialIcon";

function BOTWCompanion() {
  const onHandleIconClick = (icon) => {
    let openUrl;
    if (icon === "github") {
      openUrl = "https://github.com/codetombomb/breath-of-the-wild-companion";
    }

    window.open(openUrl, "_blank");
  };
  return (
    <section className={`${styles.workOne} section`}>
      <ThreeCanvas color="white">
        <LineBurst numLines={250} lineColor="black" />
      </ThreeCanvas>
      <section className={`${styles.workOneWrapper}  flex-center section`}>
        <div className={styles.workOneMainContent}>
          <div className={`${styles.workOneTitleWrapper} flex-center`}>
            <div>
              <h1 className={styles.workOneTitle}>B.O.T.W.</h1>
              <h2 className={styles.workOneSubtitle}>companion</h2>
            </div>
          </div>
          <div className={`${styles.workOneMainBody} flex-center`}>
            <section
              className={`${styles.workOneInfo} flex-center flex-column`}
            >
              <div className={`${styles.infoHalf} ${styles.halfLeft}`}>
                <h1 className={styles.mainTitle}>
                  Breath of the Wild Companion
                </h1>
                <p className={styles.mainDescription}>
                  Breath Of The Wild Companion is a searchable tool I created
                  for players of Zelda: Breath Of The Wild. It offers detailed
                  information on creatures, equipment, materials, monsters, and
                  treasure, making it a valuable resource for enhancing your
                  gameplay. With easy access and comprehensive details, this
                  platform ensures you have all the information you need right
                  at your fingertips.
                </p>
              </div>
              <div className={`${styles.infoHalf} ${styles.halfRight}`}>
                <div className="flex-center flex-column">
                  <img
                    className={styles.workOneDemo}
                    src="./botw-img.png"
                  ></img>
                  <div className={`${styles.workOneLinks} flex-center`}>
                    <SocialIcon
                      iconName="github"
                      icon={githubIcon}
                      handleIconClick={onHandleIconClick}
                    />
                    <h3>
                      <a
                        className={styles.websiteLink}
                        href="https://codetombomb.github.io/breath-of-the-wild-companion/"
                        target="_blank"
                      >
                        Website
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
}

export default BOTWCompanion;
