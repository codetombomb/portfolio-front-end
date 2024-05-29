import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import WorksTitleSection from "./sections/WorksTitleSection/WorksTitleSection";
import { Leva } from "leva";
import BOTWCompanion from "./sections/BOTWCompanion/BOTWCompanion";
import PyCliGpt from "./sections/PyCliGpt/PyCliGpt";

function App() {
  return (
    <>
      <Leva hidden />
      <Home />
      <About />
      <WorksTitleSection />
      <BOTWCompanion />
      <PyCliGpt />
    </>
  );
}

export default App;
