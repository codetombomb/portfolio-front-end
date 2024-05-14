import { useMemo, useRef } from "react";
import { Line } from "@react-three/drei";
import { LineBasicMaterial, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

export default function LineBurst({ numLines, lineColor }) {
  const lineBurstRef = useRef(null);
  const lines = useMemo(() => {
    const points = [];
    for (let i = 0; i < numLines; i++) {
      const direction = new Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      )
        .normalize()
        .multiplyScalar(Math.random() * 10);
      points.push([new Vector3(0, 0, 0), direction]);
    }
    return points;
  }, [numLines]);

  useFrame((_, time) => {
    if (lineBurstRef) {
      lineBurstRef.current.rotation.y += time * 0.05;
      lineBurstRef.current.rotation.x -= time * 0.05;
    }
  });

  return (
    <group ref={lineBurstRef}>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line}
          color={lineColor ? lineColor : "black"}
          lineWidth={1}
          material={new LineBasicMaterial()}
        />
      ))}
    </group>
  );
}
