import style from './styles.module.css'

const HeroImage = ({imageSrc}) => {
  return (
    <img className={style.heroImage} src={imageSrc} alt="Head shot of smiling developer, Tom Tobar" />
  )
}

export default HeroImage