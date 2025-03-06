"use client";
import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Environment } from "@react-three/drei";
import Bottles from "./bottles";

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
function Sphere(props) {
  return (
    <mesh castShadow {...props} renderOrder={-2000000}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#ffffff" roughness={1} />
    </mesh>
  );
}

function Zoom({ vec = new THREE.Vector3(0, 0, 100) }) {
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.pointer.x * 5, 0, 100), 0.075);
    state.camera.position.lerp(
      vec.set(0, state.pointer.y, 100 + state.pointer.y * 5),
      0.05,
    );
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 22.5, 0.075);
    state.camera.updateProjectionMatrix();
  });
}

function Spheres() {
  const group = useRef();
  useFrame((state) => {
    group.current.children[0].position.x = THREE.MathUtils.lerp(
      group.current.children[0].position.x,
      -18 - state.pointer.x * 3,
      0.02,
    );
    group.current.children[1].position.x = THREE.MathUtils.lerp(
      group.current.children[1].position.x,
      -10 - state.pointer.x * 10,
      0.01,
    );
    group.current.children[2].position.x = THREE.MathUtils.lerp(
      group.current.children[2].position.x,
      18 - state.pointer.x * 5,
      0.03,
    );
    group.current.children[3].position.x = THREE.MathUtils.lerp(
      group.current.children[3].position.x,
      10 - state.pointer.x * 6,
      0.04,
    );
  });
  return (
    <group ref={group}>
      <Sphere position={[-40, 1, 10]} />
      <Sphere position={[-20, 8.5, -20]} scale={8.5} />
      <Sphere position={[40, 3, -4]} scale={3} />
      <Sphere position={[30, 0.5, 10]} scale={0.5} />
    </group>
  );
}

function AnimatedText({ children, position, delay }) {
  const ref = useRef();
  const [startAnimation, setStartAnimation] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const duration = 2;

  useEffect(() => {
    setTimeout(() => setStartAnimation(true), delay);
  }, [delay]);

  useFrame((_, delta) => {
    if (startAnimation && elapsedTime < duration) {
      setElapsedTime((prev) => Math.min(prev + delta, duration));
      const progress = easeOutExpo(elapsedTime / duration);
      ref.current.position.y = position[1] + progress * 3;
      ref.current.material.opacity = progress;
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={24}
      fontWeight={800}
      color="#f8f8f8"
      material-toneMapped={false}
      material-fog={false}
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0}
    >
      {children}
    </Text>
  );
}

const HeroSection = () => {
  return (
    <section className="flex h-screen w-full overflow-visible">
      <div className="z-[1] h-screen w-full">
        <Canvas
          dpr={[1, 10]}
          shadows
          camera={{ position: [0, 0, 0], fov: 22.5 }}
        >
          <fog attach="fog" args={["#D8D1BD", 100, 150]} />
          <color attach="background" args={["#97BBD1"]} />
          <spotLight
            penumbra={1}
            angle={1}
            castShadow
            position={[10, 75, 25]}
            intensity={8}
            shadow-mapSize={[512, 512]}
          />
          <Suspense fallback={null}>
            <group position={[0, -15, 0]}>
              <Bottles />
              <Spheres />

              <mesh
                rotation-x={-Math.PI / 2}
                position={[0, 0, 0]}
                scale={[175, 175, 175]}
                receiveShadow
                castShadow
                renderOrder={100000}
              >
                <planeGeometry />
                <shadowMaterial transparent color="#1a1a1a" opacity={0.25} />
              </mesh>
            </group>
            <hemisphereLight intensity={0.2} />
            <ambientLight intensity={0.5} />
            <Environment preset="warehouse" />
            <Zoom />
            <AnimatedText position={[0, 30, -150]} delay={500}>
              {"Maxnova"}
            </AnimatedText>
            <AnimatedText position={[0, 10, -150]} delay={1000}>
              {"Healthcare"}
            </AnimatedText>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default HeroSection;
