import styles from "./styles.module.css";
import MenuButton from "../MenuButton";
import TomLogo from "../TomLogo";
import ContactMenu from "../ContactMenu";

const Navbar = ({ showMenu, handleMenuBtnClick }) => {

  return (
    <div className={`${styles.navbar} flex`}>
        <TomLogo size="40" zIndex="2"/>
      <MenuButton handleMenuBtnClick={handleMenuBtnClick} />
      {showMenu && <ContactMenu />}
    </div>
  );
};

export default Navbar;
