import { useMemo } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { v4 as uuidv4 } from "uuid";

import stickNoBills from "../../assets/StickNoBillsExtraBold_Regular.json";

function ArcedText({
  text,
  radius,
  position,
  color,
  rotation,
  letterRotation,
}) {
  const font = new FontLoader().parse(stickNoBills);
  const letters = useMemo(() => text.split(""), [text]);

  const totalAngle = Math.PI;

  return (
    <group
      rotation={[rotation[0], rotation[1], rotation[2]]}
      position={[position[0], position[1], position[2]]}
    >
      {letters.map((letter, index) => {
        const angle = totalAngle * (index / letters.length) - totalAngle / 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const y = Math.sin(angle) * 0.5;

        return (
          <mesh
            key={uuidv4()}
            position={[x, y, z - 2.5 * 0.3]}
            rotation={[
              letterRotation[0],
              letterRotation[1],
              letterRotation[2] - index * 0.35,
            ]}
          >
            <textGeometry
              args={[letter, { font, size: 1, depth: 0.15, color }]}
            />
            <meshPhysicalMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

export default ArcedText;
