import { useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MouseLight = (() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lightRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      const vector = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.5);
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      const distance = 5;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      lightRef.current.position.copy(pos);
    }
  });

  return (
    <pointLight ref={lightRef} intensity={1} distance={10} color={0xffffff} />
  );
});

export default MouseLight;
