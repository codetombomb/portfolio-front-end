import React from "react";
import styles from "./styles.module.css";
import theAboutSectionTitle from "../../assets/the-about-section.svg";

function About() {
  return (
    <section className={`${styles.aboutSection} section grid-center`}>
      <div className={styles.aboutMainContent}>
        <div className={styles.aboutTopSection}>
          <div className={`${styles.aboutSectionTitleWrapper} grid-center`}>
            <img
              className={styles.aboutSectionTitle}
              src={theAboutSectionTitle}
              alt="The About Section in slimey font"
            />
          </div>
          <div className={`${styles.tomSideImgWrapper} grid-center`}>
            <img
              className={styles.tomSideImg}
              src="./tom-side.png"
              alt="Tom Tobar side shot"
            />
          </div>
        </div>
        <div className={styles.aboutBtmSection}>
          <h1 className={styles.aboutGreeting}>Hi, my name is Tom Tobar!</h1>
          <div className={styles.aboutDescription}>
            <p>
              My coding adventure kicked off in 2019, sparked by my daughter's
              question about how games are made. Transitioning from motorcycle
              mechanics to software engineering, I embraced the challenges at
              Flatiron School's bootcamp with the same grit I used in marathon
              training.
            </p>
            <p>
              Now, after creating games and refining my skills in front-end
              development, I’m eager to apply my meticulous attention to detail
              and passion for code in new, innovative software projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
