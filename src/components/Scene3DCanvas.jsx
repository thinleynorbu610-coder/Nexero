import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

/**
 * The actual three.js scene — split into its own module so the r3f/drei/
 * three bundle only loads when Scene3D lazy-imports it (see Scene3D.jsx),
 * never blocking the initial page render.
 */
export default function Scene3DCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 2, 2]} intensity={1.5} color="#a78bfa" />
      <directionalLight position={[-2, -1, -2]} intensity={0.6} color="#6366f1" />
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.1, 4]} />
          <MeshDistortMaterial color="#6366f1" distort={0.35} speed={1.5} roughness={0.2} metalness={0.4} />
        </mesh>
      </Float>
    </Canvas>
  );
}
