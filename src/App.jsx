import "./App.css";
import AboutSection from "./components/AboutSection";
import TopSection from "./components/TopSection";
import WorksSection from "./components/WorksSection";

import devData from './data'

function App() {
  
  return (
    <>
      <TopSection topSectionData={devData.topSection} />
      <AboutSection aboutSectionData={devData.aboutSection} />
      <WorksSection worksSectionData={devData.worksSection}/>
    </>
  );
}

export default App;
