import { useEffect, useState, useRef, useContext } from "react";
import styles from "./styles.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MobileContext } from "../../context/mobileContext";

import MenuButton from "../MenuButton";
import TomLogo from "../TomLogo";
import ContactMenu from "../ContactMenu";

const Navbar = ({ navData }) => {
  const { github, linkedin } = navData;
  const { isMobile } = useContext(MobileContext);
  const [showMenu, setShowMenu] = useState(false);
  const container = useRef();

  const onMenuBtnClick = () => {
    setShowMenu((previous) => !previous);
  };

  return (
    <div className={`${styles.navbar} flex`}>
      <TomLogo size="40"/>
      <MenuButton handleMenuBtnClick={onMenuBtnClick}/>
      {showMenu && <ContactMenu />}
    </div>
  );
};

export default Navbar;
