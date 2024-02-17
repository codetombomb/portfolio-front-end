import { useRef, useState } from "react"
import style from './styles.module.css'
import { useGSAP } from "@gsap/react";
import gsap from "gsap"

const MenuButton = ({ handleMenuBtnClick}) => {
    const [clicked, setClicked] = useState(false)
    const menuBtnRef = useRef(null)
    const frontLayerRef = useRef(null);
    const midLayerRef = useRef(null);
    const backLayerRef = useRef(null);
    const wrapperRef = useRef(null);
    const sliceTopRef = useRef(null)
    const sliceMidRef = useRef(null)
    const sliceBottomRef = useRef(null)


    useGSAP(() => {
        const wrapperMidPoint = wrapperRef.current.offsetHeight / 2 + 2.5
        if (clicked) {
            allowScroll(true)
            gsap.fromTo(menuBtnRef.current, { opacity: 0}, {opacity:1, delay: .2})
            gsap.to(sliceTopRef.current, { backgroundColor: "var(--primary-dark)", rotate: 45, translateY: (wrapperMidPoint)  / 2, delay: .3, duration: .2})
            gsap.to(sliceMidRef.current, { backgroundColor: "var(--primary-dark)", opacity: 0 })
            gsap.to(sliceBottomRef.current, { backgroundColor: "var(--primary-dark)", rotate: -45, translateY: (-wrapperMidPoint) / 2, delay: .3, duration: .2})
            gsap.to(backLayerRef.current, {borderColor: "var(--primary-light)"})
            gsap.to(midLayerRef.current, {borderColor: "var(--primary-light)"})
            gsap.to(frontLayerRef.current, {backgroundColor: "var(--primary-light)"})
        } else {
            allowScroll(false)
            gsap.fromTo(menuBtnRef.current, { opacity: 0}, {opacity:1, delay: .15})
            gsap.to(sliceTopRef.current, { backgroundColor: "var(--primary-light)", rotate: 0, translateY: 0, delay: .3, duration: .2 })
            gsap.to(sliceMidRef.current, { backgroundColor: "var(--primary-light)", opacity: 1, delay: .4, duration: .3  })
            gsap.to(sliceBottomRef.current, { backgroundColor: "var(--primary-light)", rotate: 0, translateY: 0, delay: .3, duration: .2 })
            gsap.to(backLayerRef.current, {borderColor: "var(--primary-dark)"})
            gsap.to(midLayerRef.current, {borderColor: "var(--primary-dark)"})
            gsap.to(frontLayerRef.current, {backgroundColor: "var(--primary-dark)"})
        }

    }, { dependencies: [clicked] })

    const allowScroll = (canScroll) => {
        if(canScroll){
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "visible"
        }
    }


    return (
        <div className={style.menuButton} onClick={() =>{
            setClicked(prev => !prev)
            handleMenuBtnClick()
            }} ref={menuBtnRef}>
            <div className={style.backLayer} ref={backLayerRef}></div>
            <div className={style.midLayer} ref={midLayerRef}></div>
            <div className={style.frontLayer} ref={frontLayerRef}>
                <div className={style.burgerWrapper} ref={wrapperRef}>
                    <div className={`${style.slice}`} ref={sliceTopRef}></div>
                    <div className={`${style.slice}`} ref={sliceMidRef}></div>
                    <div className={`${style.slice}`} ref={sliceBottomRef}></div>
                </div>
            </div>
        </div>
    );
};

export default MenuButton