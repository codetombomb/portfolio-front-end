import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function ThreeCanvas({ children }) {
  const canvasRef = useRef(null);
  return (
    <Canvas
      style={{ backgroundColor: "black" }}
      ref={canvasRef}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <OrbitControls />
      {children}
    </Canvas>
  );
}

export default ThreeCanvas;
