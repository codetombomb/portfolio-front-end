import SectionTitle from "../../components/SectionTitle";
import style from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

const LOGIN_BASE = "https://portfolio-api-ws.onrender.com"
// const LOGIN_BASE = "http://127.0.0.1:5000";

const AdminLogin = ({ onLoginSuccess, setAdminData }) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("logging in");
    window.location.href = `${LOGIN_BASE}/login`;
    fetch(`${LOGIN_BASE}/login`)
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={`flex flex-column flex-center ${style.adminLogin}`}>
      <SectionTitle title="Admin Login" color="--primary-light" padding="0px" />
      {errors.map((err) => (
        <h1 key={uuidv4()} className={style.errors}>
          {err}
        </h1>
      ))}
      <button onClick={handleLogin}>Login With Google</button>
    </section>
  );
};

export default AdminLogin;
