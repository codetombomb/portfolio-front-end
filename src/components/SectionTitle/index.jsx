import style from './styles.module.css'
const SectionTitle = ({ title, color, padding, fontSize }) => {

  return (
    <h1 className={style.sectionTitle} style={{ color: color ? `var(${color})` : null, padding: padding ? padding : null, fontSize: fontSize ? fontSize : null }}>{title}</h1>
  )
}

export default SectionTitle