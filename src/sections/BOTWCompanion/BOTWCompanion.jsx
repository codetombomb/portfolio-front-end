import React from "react";
import ThreeCanvas from "../../components/ThreeCanvas/ThreeCanvas";
import LineBurst from "../../components/LineBurst/LineBurst";
import styles from "./styles.module.css";

function BOTWCompanion() {
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
            <section className={styles.workOneInfo}></section>
          </div>
        </div>
      </section>
    </section>
  );
}

export default BOTWCompanion;
