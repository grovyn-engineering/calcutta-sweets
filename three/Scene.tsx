'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Lights from './Lights';
import RasmalaiModel from './RasmalaiModel';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Lights />
        <RasmalaiModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Suspense>
    </Canvas>
  );
}
