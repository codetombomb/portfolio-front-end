import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

function Cube(props) {
  const meshRef = useRef(null);

  // animation frame
  useFrame(() => {
    meshRef.current.rotation.x += 0.005; // spin x and y
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <RoundedBox args={[1, 1, 1]}>
        <meshStandardMaterial color={"greenyellow"} />
      </RoundedBox>
    </mesh>
  );
}
export default Cube;
