import { useContext, useEffect, useState } from "react";
import "./App.css";
import AboutSection from "./components/AboutSection";
import TopSection from "./components/TopSection";
import WorksSection from "./components/WorksSection";

import devData from "./data";
import ChatBox from "./components/ChatBox";
import AdminBanner from "./components/AdminBanner";
import { useSearchParams } from "react-router-dom";
import { ChatContext } from "./context/chatContext";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()
  const { currentAdmin, isAdmin, onAdminLogin } = useContext(ChatContext)

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const admin = JSON.parse(urlParams.get("admin"));
    if (admin) {
      onAdminLogin(admin)
      searchParams.delete("admin")
      setSearchParams(searchParams)
    }
  }, []);

  const adminLogoutOnTabClose = (e) => {
    e.preventDefault();
    onAdminLogout(currentAdmin);
  };

  if (isAdmin) {
    window.addEventListener("beforeunload", adminLogoutOnTabClose);
  }

  const handleSetShowChat = () => {
    setShowChat((previousValue) => !previousValue);
  };

  return (
    <>
      {isAdmin && (
        <AdminBanner />
      )}
      <TopSection
        topSectionData={devData.topSection}
        handleSetShowChat={handleSetShowChat}
        showChat={showChat}
        isAdmin={isAdmin}
        currentAdmin={currentAdmin}
        navData={devData.navLinks}
      />
      <AboutSection aboutSectionData={devData.aboutSection} />
      <WorksSection worksSectionData={devData.worksSection} />
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
