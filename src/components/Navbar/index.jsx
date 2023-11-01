import styles from './styles.module.css'

const Navbar = () => {
  return (
    <div className={`${styles.navbar} flex`}>
        <div className={`${styles.navLogo} grid grid-center`}>Tom Tobar</div>
        <ul className={styles.navLinks}>
            <li>about</li>
            <li>github</li>
            <li>linkedin</li>
        </ul>
    </div>
  )
}

export default Navbar