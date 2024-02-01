import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Navbar = ({ navData }) => {
  const { github, linkedin } = navData;
  const [isMobile, setIsMobile] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

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

  const toggleShowMenu = () => {
    // if (showMenu) {
    //   document.body.style.overflow = "auto";
    // } else {
    //   document.body.style.overflow = "hidden";
    // }
    setShowMenu((previous) => !previous);
  };

  return (
    <div className={`${styles.navbar} flex`}>
      <div className={`${styles.navLogo} grid grid-center`}>codetombomb</div>
      {isMobile ? (
        <>
          <div className={`${styles.hamburgerMenu}`} onClick={toggleShowMenu}>
            <div
              className={`${styles.hamburgerSlice} ${
                showMenu ? styles.hamburgerSliceTop : null
              }`}
            ></div>
            <div
              className={`${styles.hamburgerSlice} ${
                showMenu ? styles.hamburgerSliceMid : null
              }`}
            ></div>
            <div
              className={`${styles.hamburgerSlice} ${
                showMenu ? styles.hamburgerSliceBottom : null
              }`}
            ></div>
          </div>
          {showMenu && (
            <div className={styles.mobileMenu}>
              <ul className={styles.mobileNavLinks}>
                <li><a className={styles.navLink} href="#">about</a></li>
                <li><a className={styles.navLink} href={github} target="_blank">github</a></li>
                <li><a className={styles.navLink} href={linkedin} target="_blank">linkedin</a></li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <ul className={styles.navLinks}>
          <li><a className={styles.navLink} href="#">about</a></li>
          <li><a className={styles.navLink} href={github} target="_blank">github</a></li>
          <li><a className={styles.navLink} href={linkedin} target="_blank">linkedin</a></li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
