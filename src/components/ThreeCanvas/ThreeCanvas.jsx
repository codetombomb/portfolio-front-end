import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useControls } from "leva";

function ThreeCanvas({ children }) {
  const canvasRef = useRef(null);

  const { cameraPosX, cameraPosY, cameraPosZ } = useControls("camera", {
    cameraPosX: {
      value: -5,
      min: -30,
      max: 30,
      step: 0.001,
      // onChange: (value) => (canvasRef.current.cameraPosX = value),
    },
    cameraPosY: {
      value: 5,
      min: -30,
      max: 30,
      step: 0.001,
      // onChange: (value) => (canvasRef.current.cameraPosY = value),
    },
    cameraPosZ: {
      value: 8,
      min: -30,
      max: 30,
      step: 0.001,
      // onChange: (value) => (canvasRef.current.cameraPosZ = value),
    },
  });
  return (
    <Canvas
      style={{ backgroundColor: "black" }}
      ref={canvasRef}
      camera={{
        fov: 50,
        near: 0.6,
        far: 200,
        position: [cameraPosX, cameraPosY, cameraPosZ],
      }}
    >
      <OrbitControls />
      {children}
    </Canvas>
  );
}

export default ThreeCanvas;
