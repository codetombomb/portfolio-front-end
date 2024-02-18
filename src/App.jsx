import { useContext, useEffect, useState } from "react";
import "./App.css";
import AboutSection from "./components/AboutSection";
import TopSection from "./components/TopSection";
import WorksSection from "./components/WorksSection";

import devData from "./data";
import ChatBox from "./components/ChatBox";
import AdminBanner from "./components/AdminBanner";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatContext } from "./context/chatContext";
import { generateToken, messaging } from "./notifications/firebase";
import { onMessage } from "firebase/messaging";
import toast, { Toaster } from 'react-hot-toast'
import PageSelection from "./components/PageSelection";
import Navbar from "./components/Navbar";

function App() {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const { currentAdmin, isAdmin, onAdminLogin, setDeviceTokenId } = useContext(ChatContext)


  useEffect(() => {
    if (location.pathname === "/admin" && !isAdmin) {
      navigate("/")
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const admin = JSON.parse(urlParams.get("admin"));
      if (admin) {
        handleGetToken(admin.id)
        onMessage(messaging, (payload) => {
          toast(payload.notification.body)
        })
        onAdminLogin(admin)
        navigate("/admin")
      }
    }
  }, []);

  const handleGetToken = async (admin_id) => {
    const token_id = await generateToken(admin_id)
    if (token_id) setDeviceTokenId(token_id)
  }

  const handleSetShowChat = () => {
    setShowChat((previousValue) => !previousValue);
  };

  return (
    <>
      <Toaster />
      {isAdmin && (
        <AdminBanner />
      )}
      <Navbar navData={devData.navLinks}/>
      <TopSection
        topSectionData={devData.topSection}
        handleSetShowChat={handleSetShowChat}
        showChat={showChat}
        isAdmin={isAdmin}
        currentAdmin={currentAdmin}
        navData={devData.navLinks}
      />
      <AboutSection aboutSectionData={devData.aboutSection} />
      {/* <WorksSection worksSectionData={devData.worksSection} /> */}
      {showChat && (
        <ChatBox
          showChat={showChat}
          handleSetShowChat={handleSetShowChat}
        />
      )}
    </>
  );
}

export default App;