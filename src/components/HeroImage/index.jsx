import style from './styles.module.css'
import imageSrc from "../../assets/tom-image.png"
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
    <img className={style.heroImage} ref={imgRef} src={imageSrc} alt="Head shot of smiling developer, Tom Tobar" />
  )
}

export default HeroImage