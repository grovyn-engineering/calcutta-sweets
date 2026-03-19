'use client';

import { useGLTF } from '@react-three/drei';

export default function RasmalaiModel(props: any) {
  // Using try-catch or graceful fallback just in case the file doesn't exist yet
  // In a real scenario, useGLTF would suspend. If the file is missing, it will throw.
  // We'll wrap it conceptually here, but standard usage relies on Suspense boundary in Scene.
  const { scene } = useGLTF('/models/rasmalai.glb');

  return (
    <primitive object={scene} {...props} scale={1} position={[0, -0.5, 0]} />
  );
}

// Preload the model
useGLTF.preload('/models/rasmalai.glb');
