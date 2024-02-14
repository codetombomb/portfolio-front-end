import { useEffect, useRef, useState } from "react"
import style from './styles.module.css'
import open from "../../assets/burger-open.svg"
import closed from "../../assets/burger-closed.svg"
// import gsap from "gsap"
// import { useGSAP } from "@gsap/react"



const MenuButton = () => {
    const [clicked, setClicked] = useState(false);
    const openImgRef = useRef(null);
    const closedImgRef = useRef(null);

    return (
        <div className={style.menuButton} onClick={() => setClicked(prev => !prev)}>
            <div className={style.backLayer}></div>
            <div className={style.midLayer}></div>
            <div className={style.frontLayer}>
                <div className={style.burgerWrapper}>
                    <img ref={closedImgRef} className={style.burgerState} src={closed} alt="Menu" style={{display: !clicked ? "block" : "none"}}/>
                    <img ref={openImgRef} className={style.burgerState} src={open} alt="Close" style={{display: clicked ? "block" : "none"}}/>
                </div>
            </div>
        </div>
    );
};

export default MenuButton