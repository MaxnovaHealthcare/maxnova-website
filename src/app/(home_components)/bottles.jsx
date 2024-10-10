import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { useCursor, useGLTF } from "@react-three/drei";

function Bottle({ glas, cap, children, ...props }) {
  const ref = useRef();
  const { nodes } = useGLTF("/models/draco.glb");
  const [hovered, set] = useState(false);
  useCursor(hovered);

  const bottleMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#2F536A",
        transmission: 1,
        roughness: 0.1,
        thickness: 25,
        envMapIntensity: 1,
      }),
    [],
  );

  const textMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.1,
        metalness: 0.1,
      }),
    [],
  );

  const capMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
      }),
    [],
  );

  return (
    <group
      rotation={[Math.PI / 2, 0, 5]}
      {...props}
      onPointerOver={(e) => set(true)}
      onPointerOut={() => set(false)}
    >
      <group ref={ref}>
        <mesh
          castShadow
          geometry={nodes[glas].geometry}
          material={bottleMaterial}
        />
        <mesh
          castShadow
          geometry={nodes[cap].geometry}
          material={capMaterial}
        />
      </group>
    </group>
  );
}

export default function Bottles(props) {
  return (
    <group {...props} dispose={null} scale={[0.09, 0.09, 0.09]}>
      <Bottle position={[140, 0, 0]} glas="Untitled018" cap="Untitled018_1" />
      <Bottle position={[80, 0, 0]} glas="Untitled078" cap="Untitled078_1" />
      <Bottle position={[-2, 0, 0]} glas="Untitled064" cap="Untitled064_1" />
      <Bottle position={[-90, 0, 0]} glas="Untitled052" cap="Untitled052_1" />
      <Bottle position={[-180, 0, 0]} glas="Untitled007" cap="Untitled007_1" />
    </group>
  );
}
