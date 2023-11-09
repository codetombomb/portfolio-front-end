import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Navbar = () => {
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
    if(showMenu){
      document.body.style.overflow = "auto"
    } else {
      document.body.style.overflow = "hidden"
    }
    setShowMenu((previous) => !previous)
  };

  return (
    <div className={`${styles.navbar} flex`}>
      <div className={`${styles.navLogo} grid grid-center`}>codetombomb</div>
      {isMobile ? (
        <>
          <div className={`${styles.hamburgerMenu}`} onClick={toggleShowMenu}>
            <div
              className={`${styles.hamburgerSlice} ${showMenu ? styles.hamburgerSliceTop : null}`}
            ></div>
            <div
              className={`${styles.hamburgerSlice} ${showMenu ? styles.hamburgerSliceMid : null}`}
            ></div>
            <div
              className={`${styles.hamburgerSlice} ${showMenu ? styles.hamburgerSliceBottom : null}`}
            ></div>
          </div>
          {showMenu && (
            <div className={styles.mobileMenu}>
              <ul className={styles.mobileNavLinks}>
                <li>about</li>
                <li>github</li>
                <li>linkedin</li>
              </ul>
            </div>
          )}
        </>
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
