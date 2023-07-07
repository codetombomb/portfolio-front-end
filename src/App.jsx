import "./App.css";
import Cube from "./components/Cube/Cube";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube position={[1, 1, 1]} />
    </Canvas>
  );
}

export default App;
