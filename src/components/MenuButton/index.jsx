import { useRef, useState } from "react"
import style from './styles.module.css'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"


const MenuButton = () => {
    const [clicked, setClicked] = useState(false)
    const burgerTopRef = useRef()
    const burgerMidRef = useRef()
    const burgerBottomRef = useRef()

    console.log(clicked)



    return (
        <div className={style.menuButton} onClick={() => setClicked(prev => !prev)}>
            <div className={style.backLayer}></div>
            <div className={style.midLayer}></div>
            <div className={style.frontLayer}>
                <div className={style.burgerWrapper}>
                    <div className={style.burgerTop} ref={burgerTopRef}></div>
                    <div className={style.burgerMid} ref={burgerMidRef}></div>
                    <div className={style.burgerBottom} ref={burgerBottomRef}></div>
                </div>
            </div>
        </div>
    )
}

export default MenuButton