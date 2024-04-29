import tomHeader from "../../assets/tom-header.svg";
import breatheLife from "../../assets/breathe-life.svg";
import "./Header.css";

function Header() {
  return (
    <div className="Header">
      <img className="tom-header" src={tomHeader} alt=""></img>;
      <img className="breathe-life" src={breatheLife} alt=""></img>
    </div>
  );
}
export default Header;
