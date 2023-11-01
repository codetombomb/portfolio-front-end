import style from "./styles.module.css";

const SectionCallToAction = ({ text, handleButtonClick, color }) => {
  return (
    <button
      className={style.sectionCallToAction}
      onClick={handleButtonClick}
      style={{ color: `var(${color})`, borderColor: `var(${color})` }}
    >
      {text}
    </button>
  );
};

export default SectionCallToAction;
