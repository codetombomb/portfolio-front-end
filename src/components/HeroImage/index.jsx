import style from './styles.module.css'
import VRFourSixFan from "../../assets/tom-beanie.png"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const HeroImage = () => {
  const imgRef = useRef()

  useGSAP(() => {
    gsap.from(imgRef.current, {
      x: "50px",
      opacity: 0,
      delay: .8
    })
  })
  return (
    <img className={style.VRFourSixFan} ref={imgRef} src={VRFourSixFan} alt="Head shot of smiling developer, Tom Tobar" />
  )
}

export default HeroImage