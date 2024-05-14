import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import WorksTitleSection from "./sections/WorksTitleSection/WorksTitleSection";
import { Leva } from "leva";
import BOTWCompanion from "./sections/BOTWCompanion/BOTWCompanion";
function App() {
  return (
    <>
      <Leva hidden />
      <Home />
      <About />
      <WorksTitleSection />
      <BOTWCompanion />
      <h1 className="section">Work 2</h1>
    </>
  );
}

export default App;
