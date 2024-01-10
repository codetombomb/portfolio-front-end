import { useEffect, useState } from "react";
import "./App.css";
import AboutSection from "./components/AboutSection";
import TopSection from "./components/TopSection";
import WorksSection from "./components/WorksSection";

import devData from "./data";
import ChatBox from "./components/ChatBox";
import AdminBanner from "./components/AdminBanner";
import { useSearchParams } from "react-router-dom";

function App({ adminData, isAdmin, onAdminLogout, onLoginSuccess }) {
  const [showChat, setShowChat] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const admin = JSON.parse(urlParams.get("admin"));
    if (admin) {
      onLoginSuccess(admin);
      searchParams.delete("admin")
      setSearchParams(searchParams)
    }
  }, []);

  const adminLogoutOnTabClose = (e) => {
    e.preventDefault();
    onAdminLogout(adminData);
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
        <AdminBanner adminData={adminData} onAdminLogout={onAdminLogout} />
      )}
      <TopSection
        topSectionData={devData.topSection}
        handleSetShowChat={handleSetShowChat}
        showChat={showChat}
        isAdmin={isAdmin}
        navData={devData.navLinks}
      />
      <AboutSection aboutSectionData={devData.aboutSection} />
      <WorksSection worksSectionData={devData.worksSection} />
      {showChat && (
        <ChatBox
          showChat={showChat}
          handleSetShowChat={handleSetShowChat}
          avatar={devData.topSection.heroImage.source}
          isAdmin={isAdmin}
          adminData={adminData}
          onAdminLogout={onAdminLogout}
        />
      )}
    </>
  );
}

export default App;
