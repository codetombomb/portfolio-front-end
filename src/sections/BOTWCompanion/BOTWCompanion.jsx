import React from "react";
import ThreeCanvas from "../../components/ThreeCanvas/ThreeCanvas";
import LineBurst from "../../components/LineBurst/LineBurst";
import styles from "./styles.module.css";

function BOTWCompanion() {
  return (
    <div className={`${styles.workOne} section`}>
      <ThreeCanvas color="white">
        <LineBurst numLines={150} lineColor="black" />
      </ThreeCanvas>
      <section className={`${styles.workOneWrapper}  flex-center`}>
        <div className={styles.workOneMainContent}>
          <div className={`${styles.workOneTitleWrapper} flex-center`}>
            <h1 className={styles.workOneTitle}>BOTW</h1>
          </div>
          <div className={styles.workOneMainBody}></div>
        </div>
      </section>
    </div>
  );
}

export default BOTWCompanion;
