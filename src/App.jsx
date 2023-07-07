import { Canvas } from "@react-three/fiber";
import "./App.css";
import Cube from "./components/Cube/Cube";
import { OrbitControls } from '@react-three/drei'

function App() {
  return (
    <Canvas style={{width: "100vw",height: "75vh", backgroundColor: "black"}}>
      <ambientLight />
      <spotLight position={[3, 3, 3]} angle={0.3} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Cube position={[0, 0, 0]} />
      <OrbitControls /> 
    </Canvas>
  );
}

export default App;


// OrbitControls allow the scroll zoom 