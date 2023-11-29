import style from './styles.module.css'

const AdminBanner = ({ adminData, onAdminLogout }) => {
  return (
    <section className={style.adminBanner}>
      <div className={style.headingWrapper}><p>Logged in as {adminData.email}</p></div>
      <p className={style.logoutBtn} onClick={() => onAdminLogout(adminData)}>Logout</p>
    </section>
  )
}

export default AdminBanner