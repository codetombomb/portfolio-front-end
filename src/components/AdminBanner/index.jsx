import { useContext } from 'react'
import style from './styles.module.css'
import { ChatContext } from '../../context/chatContext'
import { useNavigate } from 'react-router-dom';

const LOGOUT_BASE = import.meta.env.VITE_API_URL;

const AdminBanner = () => {
  const { currentAdmin, io, setIsAdmin } = useContext(ChatContext)
  const navigate = useNavigate()

  const onAdminLogout = (admin) => {
    fetch(`${LOGOUT_BASE}/logout/${admin.id}`, { method: "DELETE" }).then(
      (resp) => {
        if (resp.ok) {
          resp.json().then(admin => {
            io.emit("currentAdmin", admin);
            setIsAdmin(false);
            navigate("/")
          })
        }
      }
    );
  };
  return (
    <section className={style.adminBanner}>
      <div className={style.headingWrapper}><p>Logged in as {currentAdmin.email}</p></div>
      <p className={style.logoutBtn} onClick={() => onAdminLogout(currentAdmin)}>Logout</p>
    </section>
  )
}

export default AdminBanner