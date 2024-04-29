import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Home</h1>
      <h1>About</h1>
      <h1>Works Title</h1>
      <h1>Work 1</h1>
      <h1>Work 2</h1>
    </>
  );
}

export default App;
