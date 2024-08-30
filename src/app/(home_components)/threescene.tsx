import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const ShampooBottle: React.FC = () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial />
      </mesh>
      <group>
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[1, 1, 2, 30]} />
          <meshStandardMaterial color="#678e7a" />
        </mesh>
        <mesh position={[0, 1.03, 0]} castShadow>
          <sphereGeometry
            args={[1.4, 50, 50, 0, Math.PI * 4, 0, Math.PI / 4]}
          />
          <meshStandardMaterial color="#678e7a" />
        </mesh>
        <mesh position={[0, 2.4, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, 2.7, 0]} castShadow>
          <boxGeometry args={[0.2, 0.1, 0.2]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, 2.6, -0.15]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </>
  );
};

const CustomCameraControls: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.5;
    camera.position.y += (-mouse.current.y * 2 - camera.position.y) * 0.5 + 3;
    camera.lookAt(0, 1, 0);
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 1 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 1 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

const ThreeScene: React.FC = () => {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw", background: "#F2F0EA" }}
      shadows
      camera={{ position: [10, 10, 10], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <Suspense fallback={null}>
        <ShampooBottle />
      </Suspense>
      <CustomCameraControls />
    </Canvas>
  );
};

export default ThreeScene;
