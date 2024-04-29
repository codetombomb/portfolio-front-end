import Header from "../../components/Header/Header";
import "./Portfolio.css";
import Button from "../../components/Button/Button";

function Portfolio({buttons, handleClick}) {
  return (
    <div className="Portfolio">
      <Header />
      <div className="button-container">
        {buttons.map((button, index) => <Button key={index} text={button.type} handleClick={handleClick}/>)}
      </div>
    </div>
  );
}
export default Portfolio;
