import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';

// Shared glossy look for every sphere in the scene — a saturated blue-violet
// base plus a touch of emissive so shadowed sides stay rich in color rather
// than falling to black, with a tight clearcoat highlight for the bright
// specular hotspot seen in the reference art.
function glossyProps(color, emissive) {
  return {
    color,
    emissive,
    emissiveIntensity: 0.35,
    metalness: 0.65,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.1,
  };
}

// A moon that orbits the scene origin along a circular path (in the parent
// group's local plane — see the tilted <group> below), with a slow vertical
// bob layered on top so the ring doesn't look perfectly mechanical.
function OrbitMoon({ radius, angle, speed, size, color, emissive, bobIntensity = 0.12 }) {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    const t = angle + clock.elapsedTime * speed;
    const mesh = ref.current;
    if (!mesh) return;
    mesh.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * bobIntensity, Math.sin(t) * radius);
    mesh.rotation.y = t;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 48, 48]} />
      <meshPhysicalMaterial {...glossyProps(color, emissive)} />
    </mesh>
  );
}

/**
 * The actual three.js scene — split into its own module so the r3f/drei/
 * three bundle only loads when Scene3D lazy-imports it (see Scene3D.jsx),
 * never blocking the initial page render.
 *
 * A small glossy "planet" cluster: one large sphere, a thin tilted orbit
 * ring, four moons continuously revolving around it along that ring, and a
 * scatter of soft sparkles — used sparingly (see Services.jsx) rather than
 * everywhere.
 */
export default function Scene3DCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.55} />
      {/* Cool cyan-blue key light, upper-left — the bright hotspot */}
      <directionalLight position={[-2.5, 2.5, 3]} intensity={2.6} color="#7dd3fc" />
      {/* Warm magenta rim light, lower-right — the violet/pink edge glow */}
      <directionalLight position={[2.5, -1.5, -1]} intensity={1.8} color="#e879f9" />
      {/* Soft indigo fill so the shadowed side reads as deep blue, not black */}
      <directionalLight position={[-1, -1, -2]} intensity={0.5} color="#4338ca" />
      <pointLight position={[0, 0, 4]} intensity={0.4} color="#ffffff" />

      {/* Orbit ring, tilted to pass behind and in front of the main sphere */}
      <group rotation={[1.25, 0.15, -0.4]}>
        <mesh>
          <torusGeometry args={[1.62, 0.01, 16, 120]} />
          <meshBasicMaterial color="#d8b4fe" transparent opacity={0.6} />
        </mesh>

        <OrbitMoon radius={1.68} angle={0} speed={0.16} size={0.22} color="#8b5cf6" emissive="#4c1d95" />
        <OrbitMoon radius={1.48} angle={Math.PI / 2} speed={0.16} size={0.17} color="#6366f1" emissive="#312e81" />
        <OrbitMoon radius={1.62} angle={Math.PI} speed={0.16} size={0.27} color="#a855f7" emissive="#581c87" />
        <OrbitMoon radius={1.55} angle={(3 * Math.PI) / 2} speed={0.16} size={0.33} color="#7c3aed" emissive="#3730a3" />
      </group>

      {/* Main planet */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[1.35, 64, 64]} />
          <meshPhysicalMaterial {...glossyProps('#4338ca', '#1e1b6e')} />
        </mesh>
      </Float>

      <Sparkles count={26} scale={[5, 4, 3]} size={2.2} speed={0.25} opacity={0.6} color="#e9d5ff" />
    </Canvas>
  );
}
