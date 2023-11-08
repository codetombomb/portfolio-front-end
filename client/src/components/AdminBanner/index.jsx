import style from './styles.module.css'

const AdminBanner = ({adminData}) => {
  return (
    <div className={style.adminBanner}>Logged in as {adminData.email}</div>
  )
}

export default AdminBanner