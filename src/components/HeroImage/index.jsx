import style from './styles.module.css'
import imageSrc from "../../assets/tom-image.png"

const HeroImage = () => {
  return (
    <img className={style.heroImage} src={imageSrc} alt="Head shot of smiling developer, Tom Tobar" />
  )
}

export default HeroImage