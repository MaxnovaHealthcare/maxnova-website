import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, useGLTF } from "@react-three/drei";

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function Bottle({ glas, cap, startPos, endPos, duration, delay, ...props }) {
  const ref = useRef();
  const { nodes } = useGLTF("/models/draco.glb");
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const [startAnimation, setStartAnimation] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

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

  const capMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
      }),
    [],
  );

  // Start animation after delay
  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true);
    }, delay);
  }, [delay]);

  // Smooth animation frame
  useFrame((_, delta) => {
    if (startAnimation && elapsedTime < duration) {
      setElapsedTime((prev) => Math.min(prev + delta, duration));

      const progress = easeOutExpo(elapsedTime / duration); // Smooth easing
      const newPos = new THREE.Vector3()
        .copy(new THREE.Vector3(...startPos))
        .lerp(new THREE.Vector3(...endPos), progress);

      if (ref.current) {
        ref.current.position.set(newPos.x, newPos.y, newPos.z);
      }
    }
  });

  return (
    <group
      ref={ref}
      position={startPos}
      rotation={[Math.PI / 2, 0, 5]}
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        castShadow
        geometry={nodes[glas].geometry}
        material={bottleMaterial}
      />
      <mesh castShadow geometry={nodes[cap].geometry} material={capMaterial} />
    </group>
  );
}

export default function Bottles(props) {
  return (
    <group {...props} dispose={null} scale={[0.11, 0.11, 0.11]}>
      <Bottle
        startPos={[550, 0, 0]}
        endPos={[140, 0, 30]}
        duration={2.5}
        delay={500}
        glas="Untitled018"
        cap="Untitled018_1"
      />
      <Bottle
        startPos={[550, 0, 0]}
        endPos={[80, 0, 0]}
        duration={2.5}
        delay={250}
        glas="Untitled078"
        cap="Untitled078_1"
      />

      {/* Center bottle (coming from the back) */}
      <Bottle
        startPos={[50, , 750]}
        endPos={[-2, 0, -30]}
        duration={2.5}
        delay={750}
        glas="Untitled064"
        cap="Untitled064_1"
      />

      {/* Right side bottles (coming from the right) */}
      <Bottle
        startPos={[-550, 0, 0]}
        endPos={[-90, 0, 0]}
        duration={2.2}
        delay={250}
        glas="Untitled052"
        cap="Untitled052_1"
      />
      <Bottle
        startPos={[-550, 0, 0]}
        endPos={[-150, 1, 30]}
        duration={2.5}
        delay={500}
        glas="Untitled007"
        cap="Untitled007_1"
      />
    </group>
  );
}
