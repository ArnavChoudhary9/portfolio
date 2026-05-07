import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MouseLight = ({
  isMobile,
  disabled = false,
}: {
  isMobile: boolean;
  disabled?: boolean;
}) => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const lightRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (disabled) return;
    const onMouse = (e: MouseEvent) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mousePosition.current.x = (t.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(t.clientY / window.innerHeight) * 2 + 1;
    };

    if (!isMobile) window.addEventListener("mousemove", onMouse, { passive: true });
    else window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      if (!isMobile) window.removeEventListener("mousemove", onMouse);
      else window.removeEventListener("touchmove", onTouch);
    };
  }, [isMobile, disabled]);

  useFrame(() => {
    if (disabled || !lightRef.current) return;
    const v = new THREE.Vector3(mousePosition.current.x, mousePosition.current.y, 0.5);
    v.unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const distance = 7;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    lightRef.current.position.lerp(pos, isMobile ? 0.05 : 0.3);
  });

  return (
    <pointLight
      castShadow
      ref={lightRef}
      intensity={disabled ? 0 : 2.5}
      distance={2.5}
      color={0xadc6ff}
    />
  );
};

export default MouseLight;
