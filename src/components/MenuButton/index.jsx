import { useEffect, useRef, useState } from "react"
import style from './styles.module.css'
import open from "../../assets/burger-open.svg"
import closed from "../../assets/burger-closed.svg"
import { useGSAP } from "@gsap/react";
import gsap from "gsap"

const MenuButton = () => {
    const [clicked, setClicked] = useState(false);
    const frontLayerRef = useRef(null);
    const wrapperRef = useRef(null);
    const sliceTopRef = useRef(null)
    const sliceMidRef = useRef(null)
    const sliceBottomRef = useRef(null)

    useGSAP(() => {
        const wrapperMidPoint = wrapperRef.current.offsetHeight / 2

        if (clicked) {
            console.log("btn clicked")
            gsap.to(sliceTopRef.current, { rotate: 45, translateY: wrapperMidPoint / 2 })
            gsap.to(sliceMidRef.current, { opacity: 0 })
            gsap.to(sliceBottomRef.current, { rotate: -45, translateY: -wrapperMidPoint / 2 })
        } else {
            gsap.to(sliceTopRef.current, { rotate: 0, translateY: 0 })
            gsap.to(sliceMidRef.current, { opacity: 1 })
            gsap.to(sliceBottomRef.current, { rotate: 0, translateY: 0 })
        }

    }, { dependencies: [clicked] })


    return (
        <div className={style.menuButton} onClick={() => setClicked(prev => !prev)}>
            <div className={style.backLayer}></div>
            <div className={style.midLayer}></div>
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