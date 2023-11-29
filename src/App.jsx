import { useContext, useState, useEffect } from "react";
import "./App.css";
import AboutSection from "./components/AboutSection";
import TopSection from "./components/TopSection";
import WorksSection from "./components/WorksSection";

import devData from "./data";
import ChatBox from "./components/ChatBox";
import AdminBanner from "./components/AdminBanner";

import { ChatContext } from "./context/chatContext";

function App({ adminData, isAdmin, onAdminLogout }) {
  const [showChat, setShowChat] = useState(false);

  if (isAdmin) {
    useEffect(() => {
      window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault()
        onAdminLogout(adminData)
      });
    })
  }

  const handleSetShowChat = () => {
    setShowChat((previousValue) => !previousValue);
  };

  return (
    <>
      {isAdmin && <AdminBanner adminData={adminData} onAdminLogout={onAdminLogout} />}
      <TopSection
        topSectionData={devData.topSection}
        handleSetShowChat={handleSetShowChat}
        isAdmin={isAdmin}
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
