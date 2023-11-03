import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
  }, []);

  const resize = () => {
    if (window.innerWidth < 576) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return (
    <div className={`${styles.navbar} flex`}>
      <div className={`${styles.navLogo} grid grid-center`}>codetombomb</div>
      {isMobile ? (
        <div className={styles.hamburgerMenu}>
          <div className={`${styles.hamburgerSlice} ${styles.hamburgerSliceTop} `}></div>
          <div className={`${styles.hamburgerSlice} ${styles.hamburgerSliceMid} `}></div>
          <div className={`${styles.hamburgerSlice} ${styles.hamburgerSliceBottom} `}></div>
        </div>
      ) : (
        <ul className={styles.navLinks}>
          <li>about</li>
          <li>github</li>
          <li>linkedin</li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
