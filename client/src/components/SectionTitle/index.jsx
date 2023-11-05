import style from './styles.module.css'
const SectionTitle = ({title, color}) => {
  return (
    <h1 className={style.sectionTitle} style={{color: color ? `var(${color})` : null}}>{title}</h1>
  )
}

export default SectionTitle