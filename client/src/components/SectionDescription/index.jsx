import style from './styles.module.css'
const SectionDescription = ({text, color}) => {
  return (
    <p className={style.sectionDescription} style={{color: color ? `var(${color})` : null}}>{text}</p>
  )
}

export default SectionDescription