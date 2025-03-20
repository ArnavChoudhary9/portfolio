import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { camera, mouse } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      // mouse -> 3D space
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();

      const distance = 5;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      lightRef.current.position.copy(pos);
    }
  });

  return <pointLight ref={lightRef} intensity={1} distance={10} color={0xffffff} />
}

export default MouseLight;
