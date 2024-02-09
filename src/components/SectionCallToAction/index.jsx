import style from "./styles.module.css";
import { useRef } from "react";
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const SectionCallToAction = ({ text, handleButtonClick, color }) => {
  const btnRef = useRef()

  useGSAP(() => {
    gsap.from(btnRef.current, {
      y: "30px",
      opacity: 0,
      delay: 1
    })
  })

  return (
    <button
      className={style.sectionCallToAction}
      ref={btnRef}
      onClick={handleButtonClick}
      style={{ color: `var(${color})`, borderColor: `var(${color})` }}
    >
      {text}
    </button>
  );
};

export default SectionCallToAction;
