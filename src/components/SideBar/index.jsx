import styles from './styles.module.css'
import tomLogo from '../../assets/tom-logo.svg'
const SideBar = () => {
return <section className={styles.sideBar}>
    <img className={styles.tomLogo} src={tomLogo}/>
    <p>Links</p>
</section>
}

export default SideBar