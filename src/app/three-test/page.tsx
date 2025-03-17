'use client'

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

const ThreeTest = () => {
  const boxRef = useRef(null);

  return (
    <div className='flex items-center min-h-screen'
      style={{
        height: 'calc(100vh - 5rem)'
      }}
    >
      <Canvas>
        <ambientLight intensity={0.75} />
        <pointLight castShadow intensity={10} position={[2.5, 2.5, 2.5]} />
        <mesh ref={boxRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" roughness={0.4} metalness={0.1} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ThreeTest;
