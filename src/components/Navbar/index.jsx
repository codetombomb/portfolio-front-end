import { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const Navbar = ({ navData }) => {
  const { github, linkedin } = navData;
  const [isMobile, setIsMobile] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const container = useRef()

  useGSAP(() => {
    if (!isMobile && container.current) {
      gsap.from(".gsap-link", {
        x: "-30px",
        opacity: 0,
        duration: 0.8,
        delay: .3,
        stagger: {
          each: .3
        }
      });
    }
  }, { dependencies: [isMobile], scope: container });

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
    setShowMenu((previous) => !previous);
  };

  return (
    <div className={`${styles.navbar} flex`}>
      <div className={`${styles.navLogo} grid grid-center`}>web developer</div>
      {isMobile ? (
        <>
          <div className={`${styles.hamburgerMenu}`} onClick={toggleShowMenu}>
            <div
              className={`${styles.hamburgerSlice} ${showMenu ? styles.hamburgerSliceTop : null
                }`}
            ></div>
            <div
              className={`${styles.hamburgerSlice} ${showMenu ? styles.hamburgerSliceMid : null
                }`}
            ></div>
            <div
              className={`${styles.hamburgerSlice} ${showMenu ? styles.hamburgerSliceBottom : null
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
        <ul className={styles.navLinks} ref={container}>
          <li className="gsap-link"><a className={`${styles.navLink}`} href="#">about</a></li>
          <li className="gsap-link"><a className={`${styles.navLink}`} href={github} target="_blank">github</a></li>
          <li className="gsap-link"><a className={`${styles.navLink}`} href={linkedin} target="_blank">linkedin</a></li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
