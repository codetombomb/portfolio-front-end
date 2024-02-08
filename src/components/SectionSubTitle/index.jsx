import style from './styles.module.css'
const SectionSubTitle = ({title, color, padding}) => {

  return (
    <h3 className={style.sectionSubTitle} style={{color: color ? `var(${color})` : null, padding: padding ? padding : null}}>{title}</h3>
  )
}

export default SectionSubTitle