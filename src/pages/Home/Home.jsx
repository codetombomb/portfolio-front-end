import React from "react";
import styles from "./styles.module.css";
import githubIcon from "../../assets/github.svg";
import mediumIcon from "../../assets/medium.svg";
import linkedinIcon from "../../assets/linkedin.svg";
import SocialIcon from "../../components/SocialIcon/SocialIcon";

function Home() {
  const onHandleIconClick = (icon) => {
    let openUrl;
    if (icon === "github") {
      openUrl = "https://github.com/codetombomb";
    } else if (icon === "medium") {
      openUrl = "https://medium.com/@codetombomb";
    } else {
      openUrl = "https://linkedin.com/in/tomtobar";
    }

    window.open(openUrl, "_blank");
  };
  return (
    <section className={`section ${styles.home} grid-center`}>
      <main className={styles.mainContent}>
        <section className={styles.topSection}>
          <div className={`${styles.nameWrapper}`}>
            <span className="txt-same-line-wrapper">
              <h1>Dev</h1>
              <h1>Tom</h1>
            </span>
            <h1>Tobar</h1>
          </div>
          <div className={styles.headlineWrapper}>
            <p>I use cool tools to make fun internet things!</p>
          </div>
        </section>
        <section className={`${styles.btmSection}`}>
          <div className="grid-center">
            <img className={styles.tomImg} src="./tom-front.png" alt="tom" />
          </div>
          <div className={`${styles.hireMeWrapper} grid-center`}>
            <h1 className={styles.hireMe}>Hire now!</h1>
          </div>
          <nav className={`${styles.navWrapper} grid-center`}>
            <div className={`${styles.navLinks} flex-align-center`}>
              <a href="#about-section">about</a>
              <a href="#works-section">works</a>
            </div>
          </nav>
          <div className={`${styles.socialLinksWrapper} flex-align-center`}>
            <SocialIcon
              iconName="github"
              icon={githubIcon}
              handleIconClick={onHandleIconClick}
            />
            <SocialIcon
              iconName="medium"
              icon={mediumIcon}
              handleIconClick={onHandleIconClick}
            />
            <SocialIcon
              iconName="linkedin"
              icon={linkedinIcon}
              handleIconClick={onHandleIconClick}
            />
          </div>
        </section>
      </main>
    </section>
  );
}

export default Home;
