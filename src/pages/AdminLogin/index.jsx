import SectionTitle from "../../components/SectionTitle";
import style from "./styles.module.css";

import { useState } from 'react'

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

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
      body: JSON.stringify({ email, first_name, last_name })
    }
    fetch("https://portfolio-api-ws.onrender.com/login", config)
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => {
            console.log({email, first_name, last_name, picture, name})
            onLoginSuccess({email, first_name, last_name, picture, name});
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
      {errors.map(err => <h1 className={style.errors}>{err}</h1>)}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const {
            email,
            given_name,
            family_name,
            picture,
            name
          } = jwtDecode(credentialResponse.credential)
          console.log(jwtDecode(credentialResponse.credential))
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
