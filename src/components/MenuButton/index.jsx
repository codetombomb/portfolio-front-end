import { useRef } from "react"
import style from './styles.module.css'
import { useGSAP } from "@gsap/react";
import gsap from "gsap"

const MenuButton = ({clicked, handleMenuBtnClick}) => {
    const menuBtnRef = useRef(null)
    const frontLayerRef = useRef(null);
    const midLayerRef = useRef(null);
    const backLayerRef = useRef(null);
    const wrapperRef = useRef(null);
    const sliceTopRef = useRef(null)
    const sliceMidRef = useRef(null)
    const sliceBottomRef = useRef(null)

    useGSAP(() => {
        const wrapperMidPoint = wrapperRef.current.offsetHeight / 2
        if (clicked) {
            gsap.fromTo(menuBtnRef.current, { opacity: 0}, {opacity:1, delay: .3})
            gsap.to(sliceTopRef.current, { backgroundColor: "var(--primary-dark)", rotate: 45, translateY: wrapperMidPoint / 2 })
            gsap.to(sliceMidRef.current, { backgroundColor: "var(--primary-dark)", opacity: 0 })
            gsap.to(sliceBottomRef.current, { backgroundColor: "var(--primary-dark)", rotate: -45, translateY: -wrapperMidPoint / 2 })
            gsap.to(backLayerRef.current, {borderColor: "var(--primary-light)"})
            gsap.to(midLayerRef.current, {borderColor: "var(--primary-light)"})
            gsap.to(frontLayerRef.current, {backgroundColor: "var(--primary-light)"})
        } else {
            gsap.fromTo(menuBtnRef.current, { opacity: 0}, {opacity:1, delay: .15})
            gsap.to(sliceTopRef.current, { backgroundColor: "var(--primary-light)", rotate: 0, translateY: 0 })
            gsap.to(sliceMidRef.current, { backgroundColor: "var(--primary-light)", opacity: 1 })
            gsap.to(sliceBottomRef.current, { backgroundColor: "var(--primary-light)", rotate: 0, translateY: 0 })
            gsap.to(backLayerRef.current, {borderColor: "var(--primary-dark)"})
            gsap.to(midLayerRef.current, {borderColor: "var(--primary-dark)"})
            gsap.to(frontLayerRef.current, {backgroundColor: "var(--primary-dark)"})
        }

    }, { dependencies: [clicked] })


    return (
        <div className={style.menuButton} onClick={handleMenuBtnClick} ref={menuBtnRef}>
            <div className={style.backLayer} ref={backLayerRef}></div>
            <div className={style.midLayer} ref={midLayerRef}></div>
            <div className={style.frontLayer} ref={frontLayerRef}>
                <div ref={wrapperRef}>
                    <div className={`${style.slice} ${style.sliceTop}`} ref={sliceTopRef}></div>
                    <div className={`${style.slice}  ${style.sliceMid}`} ref={sliceMidRef}></div>
                    <div className={`${style.slice}  ${style.sliceBottom}`} ref={sliceBottomRef}></div>
                </div>
            </div>
        </div>
    );
};

export default MenuButton