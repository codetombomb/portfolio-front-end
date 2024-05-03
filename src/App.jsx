import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

function App() {
  return (
    <>
      <Home />
      <About />
      <h1
        className="section"
        style={{ backgroundColor: "black", paddingTop: "5%" }}
      >
        Works Title
      </h1>
      <h1 className="section">Work 1</h1>
      <h1 className="section">Work 2</h1>
    </>
  );
}

export default App;
