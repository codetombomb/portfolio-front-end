import { useState } from "react";
import "./App.css";
import AboutSection from "./components/AboutSection";
import TopSection from "./components/TopSection";
import WorksSection from "./components/WorksSection";

import devData from "./data";
import ChatBox from "./components/ChatBox";

function App() {
  const [showChat, setShowChat] = useState(false);
  const handleSetShowChat = () => {
    console.log("Running handle set show chat");
    setShowChat((previousValue) => !previousValue);
  };

  return (
    <>
      {showChat && <ChatBox handleSetShowChat={handleSetShowChat} avatar={devData.topSection.heroImage.source}/>}
      <TopSection
        topSectionData={devData.topSection}
        handleSetShowChat={handleSetShowChat}
      />
      <AboutSection aboutSectionData={devData.aboutSection} />
      <WorksSection worksSectionData={devData.worksSection} />
    </>
  );
}

export default App;
