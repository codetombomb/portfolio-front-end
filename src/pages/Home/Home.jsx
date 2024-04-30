import React from "react";
import styles from "./styles.module.css";
import githubIcon from "../../assets/github.svg";
import mediumIcon from "../../assets/medium.svg";
import linkedinIcon from "../../assets/linkedin.svg";

function Home() {
  const handleIconClick = (event) => {
    console.log("clicked", event.target.name);
  };
  return (
    <section className={`section ${styles.home} grid-center`}>
      <main className={styles.mainContent}>
        <div className={styles.nameWrapper}>
          <span className={`txt-same-line-wrapper`}>
            <h1>Dev</h1>
            <h1>Tom</h1>
          </span>
          <h1>Tobar</h1>
        </div>
        <div className={styles.headlineWrapper}>
          <p>I use cool tools to make fun internet things!</p>
        </div>
        <div className="grid-center">
          <img className={styles.tomImg} src="./tom-front.png" alt="tom" />
        </div>
        <div className={`${styles.hireMeWrapper} grid-center`}>
          <h1 className={styles.hireMe}>Hire now!</h1>
        </div>
        <nav className={`${styles.navWrapper} flex-align-center`}>
          <a href="#about-section">about</a>
          <a href="#works-section">works</a>
        </nav>
        <div className={`${styles.socialLinksWrapper} flex-align-center`}>
          <span
            onClick={handleIconClick}
            className={`${styles.socialWrapper} flex-align-center`}
            name="github"
          >
            <img src={githubIcon} alt="github social media icon" />
          </span>
          <span
            onClick={handleIconClick}
            className={`${styles.socialWrapper} flex-align-center`}
            name="medium"
          >
            <img src={mediumIcon} alt="medium social media icon" />
          </span>
          <span
            onClick={handleIconClick}
            className={`${styles.socialWrapper} flex-align-center`}
            name="linkedin"
          >
            <img src={linkedinIcon} alt="linkedin social media icon" />
          </span>
        </div>
      </main>
    </section>
  );
}

export default Home;
