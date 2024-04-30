import { useState } from "react";
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
