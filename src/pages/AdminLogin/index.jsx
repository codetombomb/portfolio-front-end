import SectionTitle from "../../components/SectionTitle";
import style from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";

import { useState } from 'react'

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

const LOGIN_BASE = "https://portfolio-api-ws.onrender.com"
// const LOGIN_BASE = "http://127.0.0.1:5000"

const AdminLogin = ({ onLoginSuccess, setAdminData }) => {
  const [errors, setErrors] = useState([])
  const [currentAdmin, setCurrentAdmin] = useState({

  })
  const navigate = useNavigate()

  const handleLogin = (email, first_name, last_name, picture, name) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, first_name, last_name, picture, name })
    }
    fetch(`${LOGIN_BASE}/login`, config)
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => {
            onLoginSuccess({email, first_name, last_name, picture, name, ...data});
            navigate("/")
          })
        } else {
          resp.json().then(({ errors }) => setErrors(errors))
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <section className={`flex flex-column flex-center ${style.adminLogin}`}>
      <SectionTitle title="Admin Login" color="--primary-light" padding="0px" />
      {errors.map(err => <h1 key={uuidv4()} className={style.errors}>{err}</h1>)}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const {
            email,
            given_name,
            family_name,
            picture,
            name
          } = jwtDecode(credentialResponse.credential)
          handleLogin(email, given_name, family_name, picture, name)
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </section>
  );
};

export default AdminLogin;
