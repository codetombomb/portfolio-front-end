import SectionTitle from "../../components/SectionTitle";
import style from "./styles.module.css";

const LOGIN_BASE = import.meta.env.VITE_API_URL;

const AdminLogin = () => {

  const handleLogin = () => {
    window.location.href = `${LOGIN_BASE}/login`;
  };

  return (
    <section className={`flex flex-column flex-center ${style.adminLogin}`}>
      <SectionTitle title="Admin Login" color="--primary-light" padding="0px" />
      <button onClick={handleLogin}>Login With Google</button>
    </section>
  );
};

export default AdminLogin;
