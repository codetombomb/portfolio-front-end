import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { useState, useRef } from "react";
import { useControls } from "leva";
import ThreeCanvas from "../../components/ThreeCanvas/ThreeCanvas";
import Skull from "../../components/Skull/Skull";

function WorksTitleSection() {
  const {
    pointLightLeftX,
    pointLightLeftY,
    pointLightLeftZ,
    pointLightLeftIntensity,
  } = useControls("pointLightLeft", {
    pointLightLeftX: { value: -1.41, min: -50, max: 50, step: 0.001 },
    pointLightLeftY: { value: -0.33, min: -50, max: 50, step: 0.001 },
    pointLightLeftZ: { value: -0.88, min: -50, max: 50, step: 0.001 },
    pointLightLeftColor: "purple",
    pointLightLeftIntensity: { value: 50.0, min: -100, max: 100, step: 0.001 },
  });
  const {
    pointLightRightX,
    pointLightRightY,
    pointLightRightZ,
    pointLightRightIntensity,
  } = useControls("pointLightRight", {
    pointLightRightX: { value: -4.28, min: -50, max: 50, step: 0.001 },
    pointLightRightY: { value: -0.78, min: -50, max: 50, step: 0.001 },
    pointLightRightZ: { value: 9.77, min: -50, max: 50, step: 0.001 },
    pointLightRightColor: "greenyellow",
    pointLightRightIntensity: {
      value: 28.31,
      min: -100,
      max: 100,
      step: 0.001,
    },
  });
  const {
    pointLightFrontX,
    pointLightFrontY,
    pointLightFrontZ,
    pointLightFrontIntensity,
  } = useControls("pointLightFront", {
    pointLightFrontX: { value: -4.12, min: -50, max: 50, step: 0.001 },
    pointLightFrontY: { value: -3.61, min: -50, max: 50, step: 0.001 },
    pointLightFrontZ: { value: 2.89, min: -50, max: 50, step: 0.001 },
    pointLightFrontColor: "white",
    pointLightFrontIntensity: {
      value: 20.01,
      min: -100,
      max: 100,
      step: 0.001,
    },
  });

  return (
    <div style={{ backgroundColor: "white", height: "50vh", width: "100vw" }}>
      <ThreeCanvas>
        <OrbitControls />

        {/* Lights */}
        <pointLight
          intensity={pointLightRightIntensity}
          color={"greenyellow"}
          position={[pointLightRightX, pointLightRightY, pointLightRightZ]}
        />
        <pointLight
          intensity={pointLightLeftIntensity}
          color={"purple"}
          position={[pointLightLeftX, pointLightLeftY, pointLightLeftZ]}
        />
        <pointLight
          intensity={pointLightFrontIntensity}
          color={"white"}
          position={[pointLightFrontX, pointLightFrontY, pointLightFrontZ]}
        />

        {/* Geometries */}

        <Skull />
      </ThreeCanvas>
    </div>
  );
}

export default WorksTitleSection;
