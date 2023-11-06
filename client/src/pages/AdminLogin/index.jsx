import SectionTitle from "../../components/SectionTitle";
import style from "./styles.module.css";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

const AdminLogin = ({onLoginSuccess}) => {
  const navigate = useNavigate()
  
  return (
    <section className={`flex flex-column flex-center ${style.adminLogin}`}>
      <SectionTitle title="Admin Login" color="--primary-light" padding="0px"/>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          onLoginSuccess(jwtDecode(credentialResponse.credential));
          navigate("/")
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </section>
  );
};

export default AdminLogin;
