import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MouseLight = (({ isMobile } : {
  isMobile: boolean
}) => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const lightRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      mousePosition.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    };

    if(!isMobile)
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    else
      window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      if(!isMobile)
        window.removeEventListener('mousemove', handleMouseMove);
      else
        window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      const vector = new THREE.Vector3(mousePosition.current.x, mousePosition.current.y, 0.5);
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      const distance = 5;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      lightRef.current.position.lerp(pos, isMobile ? 0.05 : 0.3);
    }
  });

  return (
    <pointLight ref={lightRef} intensity={1} distance={10} color={0xffffff} />
  );
});

export default MouseLight;
