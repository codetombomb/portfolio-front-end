import { useState } from "react";
import "./App.css";
import AboutSection from "./components/AboutSection";
import TopSection from "./components/TopSection";
import WorksSection from "./components/WorksSection";

import devData from "./data";
import ChatBox from "./components/ChatBox";
import AdminBanner from "./components/AdminBanner";

function App({adminData, isAdmin}) {
  const [showChat, setShowChat] = useState(false);
  const handleSetShowChat = () => {
    setShowChat((previousValue) => !previousValue);
  };

  return (
    <>
      {isAdmin && <AdminBanner adminData={adminData}/>}
      <TopSection
        topSectionData={devData.topSection}
        handleSetShowChat={handleSetShowChat}
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
        />
      )}
    </>
  );
}

export default App;
