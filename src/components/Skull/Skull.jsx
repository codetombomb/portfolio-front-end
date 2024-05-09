import styles from "./styles.module.css";
import { useLoader, extend } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useControls } from "leva";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import stickNoBills from "../../assets/StickNoBillsExtraBold_Regular.json";
import ArcedText from "../ArcedText/ArcedText";

extend({ TextGeometry });

function Skull() {
  const skullRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const font = new FontLoader().parse(stickNoBills);

  const skull = useLoader(GLTFLoader, "./sm-skull.glb", (loader) => {
    loader.manager.onLoad = () => console.log("Loading complete!");
    loader.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      setProgress((itemsLoaded / itemsTotal) * 100);
      console.log((itemsLoaded / itemsTotal) * 100);
    };
  });

  const {
    skullX,
    skullY,
    skullZ,
    skullRotationX,
    skullRotationY,
    skullRotationZ,
  } = useControls("skull", {
    skullX: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.001,
    },
    skullY: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.001,
    },
    skullZ: {
      value: 1.5,
      min: -100,
      max: 100,
      step: 0.001,
    },
    skullRotationX: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.001,
    },
    skullRotationY: {
      value: 10.9,
      min: -100,
      max: 100,
      step: 0.001,
    },
    skullRotationZ: {
      value: 0.29,
      min: -100,
      max: 100,
      step: 0.001,
    },
  });

  const { textX, textY, textZ } = useControls("text rotate", {
    textX: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.001,
    },
    textY: {
      value: Math.PI * 0.5,
      min: -5,
      max: 5,
      step: 0.001,
    },
    textZ: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.001,
    },
  });

  const {
    textRaduis,
    textPosX,
    textPosY,
    textPosZ,
    textRotationX,
    textRotationY,
    textRotationZ,
    letterRotationX,
    letterRotationY,
    letterRotationZ,
  } = useControls("text position", {
    textRaduis: {
      value: 1.7,
      min: -10,
      max: 10,
      step: 0.001,
    },
    textPosX: {
      value: -0.86,
      min: -100,
      max: 100,
      step: 0.001,
    },
    textPosY: {
      value: 1.66,
      min: -100,
      max: 100,
      step: 0.001,
    },
    textPosZ: {
      value: 1.27,
      min: -100,
      max: 100,
      step: 0.001,
    },
    textRotationX: {
      value: 0.62,
      min: -10,
      max: 10,
      step: 0.001,
    },
    textRotationY: {
      value: 2.37,
      min: -10,
      max: 10,
      step: 0.001,
    },
    textRotationZ: {
      value: -1.32,
      min: -10,
      max: 10,
      step: 0.001,
    },
    letterRotationX: {
      value: 0.65,
      min: -10,
      max: 10,
      step: 0.001,
    },
    letterRotationY: {
      value: 6.27,
      min: -10,
      max: 10,
      step: 0.001,
    },
    letterRotationZ: {
      value: -0.16,
      min: -10,
      max: 10,
      step: 0.001,
    },
  });
  return (
    <primitive
      ref={skullRef}
      object={skull.scene}
      position={[skullX, skullY, skullZ]}
      rotation={[skullRotationX, skullRotationY, skullRotationZ]}
    >
      <ArcedText
        text="WORKS"
        radius={textRaduis}
        position={[textPosX, textPosY, textPosZ]}
        color="#D5FF43"
        rotation={[textRotationX, textRotationY, textRotationZ]}
        letterRotation={[letterRotationX, letterRotationY, letterRotationZ]}
      />
    </primitive>
  );
}

export default Skull;
