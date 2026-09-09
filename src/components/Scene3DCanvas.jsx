import { Canvas } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';

// One glossy "moon" sphere, gently floating in place. Each instance in the
// scene below gets its own size/color/position and a slightly different
// Float speed/phase so the cluster drifts out of sync rather than bobbing
// in unison.
function Moon({ position, radius, color, floatSpeed = 1.2, floatIntensity = 0.6 }) {
  return (
    <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={floatIntensity}>
      <mesh position={position}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.55}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={0.9}
        />
      </mesh>
    </Float>
  );
}

/**
 * The actual three.js scene — split into its own module so the r3f/drei/
 * three bundle only loads when Scene3D lazy-imports it (see Scene3D.jsx),
 * never blocking the initial page render.
 *
 * A small glossy "planet" cluster: one large sphere, a thin tilted orbit
 * ring, four smaller floating moons, and a scatter of soft sparkles —
 * used sparingly (see Services.jsx) rather than everywhere.
 */
export default function Scene3DCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.2], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2.5, 2.5, 3]} intensity={2} color="#c4b5fd" />
      <directionalLight position={[-2, -1.5, -2]} intensity={0.7} color="#6366f1" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" />

      {/* Orbit ring, tilted to pass behind and in front of the main sphere */}
      <group rotation={[1.3, 0, -0.35]}>
        <mesh>
          <torusGeometry args={[2, 0.01, 16, 120]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.55} />
        </mesh>
      </group>

      {/* Main planet */}
      <Float speed={1} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[1.35, 64, 64]} />
          <meshPhysicalMaterial
            color="#4f46e5"
            metalness={0.6}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1}
          />
        </mesh>
      </Float>

      <Moon position={[1.45, 1.25, 0.4]} radius={0.28} color="#8b5cf6" floatSpeed={1.6} floatIntensity={0.7} />
      <Moon position={[-1.6, 0.15, 0.5]} radius={0.22} color="#6366f1" floatSpeed={1.3} floatIntensity={0.6} />
      <Moon position={[-1.0, -1.3, 0.6]} radius={0.34} color="#7c3aed" floatSpeed={1.1} floatIntensity={0.55} />
      <Moon position={[1.3, -1.15, 0.7]} radius={0.44} color="#5b21b6" floatSpeed={0.9} floatIntensity={0.45} />

      <Sparkles count={24} scale={[5, 4, 3]} size={2.2} speed={0.25} opacity={0.6} color="#c4b5fd" />
    </Canvas>
  );
}
