import { useLoader, extend } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import ArcedText from "../ArcedText/ArcedText";

extend({ TextGeometry });

function Skull() {
  const skullRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const skull = useLoader(GLTFLoader, "./sm-skull.glb", (loader) => {
    loader.manager.onLoad = () => console.log("Loading complete!");
    loader.manager.onProgress = (_, itemsLoaded, itemsTotal) => {
      setProgress((itemsLoaded / itemsTotal) * 100);
    };
  });

  useEffect(() => {
    gsap.fromTo(
      skullRef.current.rotation,
      {
        y: Math.PI,
      },
      {
        scrollTrigger: {
          start: "top center",
          end: "bottom top",
          scrub: 0.5,
        },
        y: -Math.PI,
      }
    );

    gsap.fromTo(
      skullRef.current.position,
      {
        x: 0,
        z: 0,
        y: 0,
      },
      {
        scrollTrigger: {
          start: "top center",
          end: "bottom top",
          scrub: 0.5,
        },
        x: -1,
        z: 6,
        y: 1.5,
      }
    );
  }, []);

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
      value: 1.34,
      min: -10,
      max: 10,
      step: 0.001,
    },
    textPosX: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.001,
    },
    textPosY: {
      value: 1.5,
      min: -100,
      max: 100,
      step: 0.001,
    },
    textPosZ: {
      value: -0.85,
      min: -100,
      max: 100,
      step: 0.001,
    },
    textRotationX: {
      value: 0.5,
      min: -10,
      max: 10,
      step: 0.001,
    },
    textRotationY: {
      value: 2.2,
      min: -10,
      max: 10,
      step: 0.001,
    },
    textRotationZ: {
      value: -1.65,
      min: -10,
      max: 10,
      step: 0.001,
    },
    letterRotationX: {
      value: 0.75,
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
      value: 1.1,
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
