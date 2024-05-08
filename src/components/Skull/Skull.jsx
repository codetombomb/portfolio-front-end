import styles from "./styles.module.css";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useControls } from "leva";

function Skull() {
  const skullRef = useRef(null);
  const skull = useGLTF("./sm-skull.glb");

  //   useFrame((_, delta) => {
  //     skullRef.current.rotation.y -= delta * 0.25;
  //   });

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
      value: 0,
      min: -100,
      max: 100,
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
      <Html className={styles.skull} center transform>
        <div className={styles.worksTitleWrapper}>
          <h1 className={styles.worksTitleW}>W</h1>
          <h1 className={styles.worksTitleO}>O</h1>
          <h1 className={styles.worksTitleR}>R</h1>
          <h1 className={styles.worksTitleK}>K</h1>
          <h1 className={styles.worksTitleS}>S</h1>
          {/* <h1 className={styles.worksTitleW}>W</h1> */}
        </div>
      </Html>
    </primitive>
  );
}

export default Skull;
