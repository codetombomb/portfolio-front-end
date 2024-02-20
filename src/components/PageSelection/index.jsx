import { useEffect, useRef } from "react";
import styles from "./style.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PageSelection = ({ currentPage }) => {
  const spanRefs = {
    top: useRef(null),
    about: useRef(null),
    works: useRef(null),
    footer: useRef(null),
  };

  useEffect(() => {
    Object.values(spanRefs).forEach((span) => {
      span.current.style.backgroundColor = "var(--primary-dark)";
      span.current.style.borderRadius = "50%";
    });
  }, [currentPage]);

  useGSAP(
    () => {
      gsap.fromTo(spanRefs[currentPage].current, {
        backgroundColor: "var(--primary-dark)",
        rotate: -230,
        borderRadius: "50%",
        width: "10px",
        height: "10px",
    }, {
        backgroundColor: "var(--primary-light)",
        rotate: 230,
        duration: .4,
        borderRadius: 0,
        width: "5px",
        height: "5px",
      });
    },
    { dependencies: [currentPage] }
  );

  return (
    <div className={styles.pageIndicator}>
      <span className="indicator" ref={spanRefs.top}></span>
      <span className="indicator" ref={spanRefs.about}></span>
      <span className="indicator" ref={spanRefs.works}></span>
      <span className="indicator" ref={spanRefs.footer}></span>
    </div>
  );
};

export default PageSelection;
