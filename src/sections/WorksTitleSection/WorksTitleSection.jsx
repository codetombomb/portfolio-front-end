import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { useState, useRef } from "react";
import { useControls } from "leva";
import ThreeCanvas from "../../components/ThreeCanvas/ThreeCanvas";
import Skull from "../../components/Skull/Skull";

function WorksTitleSection() {
  const { pointLightX, pointLightY, pointLightZ, pointLightIntensity } =
    useControls("pointLight", {
      pointLightX: { value: -3.15, min: -50, max: 50, step: 0.001 },
      pointLightY: { value: 1.5, min: -50, max: 50, step: 0.001 },
      pointLightZ: { value: 0.57, min: -50, max: 50, step: 0.001 },
      pointLightColor: "purple",
      pointLightIntensity: { value: 50, min: -100, max: 100, step: 0.001 },
    });

  const { ambientLightIntensity, ambientLightColor } = useControls(
    "ambientLight",
    {
      ambientLightIntensity: {
        value: 0.3,
        min: 0,
        max: 50,
        step: 0.01,
      },
      ambientLightColor: { value: "yellowgreen" },
    }
  );

  return (
    <div style={{ backgroundColor: "white", height: "50vh", width: "100vw" }}>
      <ThreeCanvas>
        <OrbitControls />

        {/* Lights */}
        <ambientLight
          intensity={ambientLightIntensity}
          color={ambientLightColor}
        />
        <pointLight
          intensity={pointLightIntensity}
          color={"purple"}
          position={[pointLightX, pointLightY, pointLightZ]}
        />

        {/* Geometries */}

        <Skull />
      </ThreeCanvas>
    </div>
  );
}

export default WorksTitleSection;
