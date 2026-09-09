import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';

// Shared glossy look for a sphere — a saturated base color plus a touch of
// emissive so shadowed sides stay rich in color rather than falling to
// black, with a tight clearcoat highlight for the bright specular hotspot.
function glossyProps(color, emissive, extra = {}) {
  return {
    color,
    emissive,
    emissiveIntensity: 0.35,
    metalness: 0.6,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.1,
    ...extra,
  };
}

// Draws N horizontal bands (hard edges, not a smooth blend) onto a tall,
// narrow canvas and wraps it around a sphere — a cheap way to get a
// Jupiter/Saturn-style "gas giant" look without a real texture asset.
function useBandTexture(colors) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 8;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const step = canvas.height / colors.length;
    colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, Math.floor(i * step), canvas.width, Math.ceil(step) + 1);
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [colors.join('|')]);
}

// Renders `text` onto a small canvas so it can sit on the robot's chest
// badge as a texture — avoids pulling in a web-font loader for two letters.
function useLabelTexture(text, color) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = color;
    ctx.font = '700 56px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 64, 68);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [text, color]);
}

// A body that orbits the scene origin along a circular path in the parent
// group's local plane, with a slow vertical bob layered on top so the ring
// doesn't look perfectly mechanical. `children` renders the visible mesh(es).
function OrbitBody({ radius, angle, speed, bobIntensity = 0.12, spin = 0.4, children }) {
  const ref = useRef(null);

  useFrame(({ clock }, delta) => {
    const t = angle + clock.elapsedTime * speed;
    const group = ref.current;
    if (!group) return;
    group.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * bobIntensity, Math.sin(t) * radius);
    group.rotation.y += spin * delta;
  });

  return <group ref={ref}>{children}</group>;
}

// A small ringed "Saturn-style" planet.
function RingedPlanet({ scale = 1, color = '#c4a878', emissive = '#4a3418', ringColor = '#e5d5b8' }) {
  return (
    <group scale={scale}>
      <mesh>
        <sphereGeometry args={[0.32, 40, 40]} />
        <meshPhysicalMaterial {...glossyProps(color, emissive, { roughness: 0.3, clearcoatRoughness: 0.2 })} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0.3]}>
        <ringGeometry args={[0.46, 0.62, 64]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// A banded gas-giant style planet (Jupiter-ish stripes).
function BandedPlanet({ scale = 1, colors, emissive = '#2a1a0a' }) {
  const texture = useBandTexture(colors);
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[0.3, 40, 40]} />
      <meshPhysicalMaterial
        map={texture}
        emissive={emissive}
        emissiveIntensity={0.2}
        metalness={0.2}
        roughness={0.45}
        clearcoat={0.4}
        clearcoatRoughness={0.3}
      />
    </mesh>
  );
}

// A matte, rocky little moon — deliberately less glossy than everything
// else so the cluster reads as a mix of materials, not one repeated sphere.
function RockMoon({ scale = 1, color = '#3f3a52' }) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[0.22, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
    </mesh>
  );
}

// The glowing "hologram" globe at the centerpiece: a solid dark core, a
// wireframe geodesic shell for the data-grid look, and a scatter of tiny
// glowing points hugging the surface.
function HoloGlobe() {
  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.35}>
      <group position={[-0.5, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.15, 48, 48]} />
          <meshPhysicalMaterial {...glossyProps('#312e81', '#1e1b4b', { roughness: 0.25 })} />
        </mesh>
        <mesh rotation={[0.3, 0.6, 0]}>
          <icosahedronGeometry args={[1.19, 2]} />
          <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.35} />
        </mesh>
        <Sparkles count={40} scale={[2.5, 2.5, 2.5]} size={1.6} speed={0.3} opacity={0.9} color="#bfdbfe" />
      </group>
    </Float>
  );
}

// Three concentric, tilted glow rings around the globe — each a bright thin
// core torus plus a softer, wider halo torus layered behind it to fake a
// bloom glow without a postprocessing pass.
function GlowRings() {
  const rings = [
    { radius: 1.55, color: '#60a5fa' },
    { radius: 1.85, color: '#a78bfa' },
    { radius: 2.15, color: '#e879f9' },
  ];
  return (
    <group position={[-0.5, 0, 0]} rotation={[1.3, 0.1, -0.3]}>
      {rings.map((ring) => (
        <group key={ring.radius}>
          <mesh>
            <torusGeometry args={[ring.radius, 0.008, 12, 140]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.85} />
          </mesh>
          <mesh>
            <torusGeometry args={[ring.radius, 0.03, 12, 140]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.12} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// A small geometric robot mascot — glossy white shell, glowing violet
// crescent eyes and ear-rings, an antenna, and an "NX" chest badge. Floats
// in place with one arm slowly waving.
function RoboMascot({ position, scale = 1 }) {
  const armRef = useRef(null);
  const badgeTexture = useLabelTexture('NX', '#a855f7');
  const shell = glossyProps('#f1f5f9', '#312e81', { emissiveIntensity: 0.08, roughness: 0.2, metalness: 0.35 });
  const glow = { color: '#c4b5fd', toneMapped: false };

  useFrame(({ clock }) => {
    if (armRef.current) {
      armRef.current.rotation.z = 2.35 + Math.sin(clock.elapsedTime * 2.2) * 0.22;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group position={position} scale={scale}>
        {/* head */}
        <mesh position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.3, 40, 40]} />
          <meshPhysicalMaterial {...shell} />
        </mesh>
        {/* eyes — glowing crescents */}
        <mesh position={[-0.1, 0.64, 0.27]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.055, 0.014, 12, 24, Math.PI]} />
          <meshBasicMaterial {...glow} />
        </mesh>
        <mesh position={[0.1, 0.64, 0.27]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.055, 0.014, 12, 24, Math.PI]} />
          <meshBasicMaterial {...glow} />
        </mesh>
        {/* ear rings */}
        <mesh position={[-0.3, 0.62, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.09, 0.012, 12, 28]} />
          <meshBasicMaterial {...glow} />
        </mesh>
        <mesh position={[0.3, 0.62, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.09, 0.012, 12, 28]} />
          <meshBasicMaterial {...glow} />
        </mesh>
        {/* antenna */}
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
          <meshPhysicalMaterial {...shell} />
        </mesh>
        <mesh position={[0, 1.07, 0]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial {...glow} />
        </mesh>
        {/* body */}
        <mesh position={[0, 0.14, 0]}>
          <capsuleGeometry args={[0.24, 0.32, 8, 20]} />
          <meshPhysicalMaterial {...shell} />
        </mesh>
        {/* chest badge */}
        <mesh position={[0, 0.16, 0.245]}>
          <circleGeometry args={[0.11, 32]} />
          <meshBasicMaterial map={badgeTexture} transparent />
        </mesh>
        {/* shoulder joints — bridge the gap between the body and each arm pivot */}
        <mesh position={[-0.27, 0.3, 0.02]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial {...shell} />
        </mesh>
        <mesh position={[0.27, 0.3, 0.02]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial {...shell} />
        </mesh>
        {/* still arm — hangs from a shoulder pivot at a slight outward angle */}
        <group position={[-0.27, 0.3, 0.02]} rotation={[0, 0, 0.35]}>
          <mesh position={[0, -0.17, 0]}>
            <capsuleGeometry args={[0.06, 0.24, 6, 12]} />
            <meshPhysicalMaterial {...shell} />
          </mesh>
          <mesh position={[0, -0.33, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshPhysicalMaterial {...shell} />
          </mesh>
        </group>
        {/* waving arm — raised by default, swinging through an arc for a wave */}
        <group ref={armRef} position={[0.27, 0.3, 0.02]} rotation={[0, 0, 2.35]}>
          <mesh position={[0, -0.17, 0]}>
            <capsuleGeometry args={[0.06, 0.24, 6, 12]} />
            <meshPhysicalMaterial {...shell} />
          </mesh>
          <mesh position={[0, -0.33, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshPhysicalMaterial {...shell} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

/**
 * The actual three.js scene — split into its own module so the r3f/drei/
 * three bundle only loads when Scene3D lazy-imports it (see Scene3D.jsx),
 * never blocking the initial page render.
 *
 * A small "space cluster": a glowing hologram globe ringed by three tilted
 * glow rings, a handful of orbiting planets/moons with varied materials,
 * a geometric robot mascot, and a scatter of ambient sparkles — used
 * sparingly (see Services.jsx) rather than everywhere.
 */
export default function Scene3DCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.4], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.55} />
      {/* Cool cyan-blue key light, upper-left — the bright hotspot */}
      <directionalLight position={[-2.5, 2.5, 3]} intensity={2.6} color="#7dd3fc" />
      {/* Warm magenta rim light, lower-right — the violet/pink edge glow */}
      <directionalLight position={[2.5, -1.5, -1]} intensity={1.8} color="#e879f9" />
      {/* Soft indigo fill so the shadowed side reads as deep blue, not black */}
      <directionalLight position={[-1, -1, -2]} intensity={0.5} color="#4338ca" />
      <pointLight position={[0, 0, 4]} intensity={0.4} color="#ffffff" />

      <GlowRings />

      <group position={[-0.5, 0, 0]} rotation={[1.3, 0.1, -0.3]}>
        {/* spin=0 here: the ring is a fixed tilt relative to the planet mesh,
            so any self-spin around this group's local Y would make it wobble */}
        <OrbitBody radius={1.55} angle={0.3} speed={0.14} spin={0}>
          <RingedPlanet scale={0.9} />
        </OrbitBody>
        <OrbitBody radius={1.85} angle={2.4} speed={0.12} spin={0.35}>
          <BandedPlanet scale={0.85} colors={['#f5deb3', '#c8935f', '#8b5a2b', '#e8c39e', '#a56a3a']} />
        </OrbitBody>
        <OrbitBody radius={2.15} angle={4.2} speed={0.1} spin={0.3}>
          <RockMoon scale={0.75} />
        </OrbitBody>
        <OrbitBody radius={1.7} angle={5.4} speed={0.13} spin={0.4}>
          <mesh>
            <sphereGeometry args={[0.24, 32, 32]} />
            <meshPhysicalMaterial {...glossyProps('#dc2626', '#3f0d0d', { roughness: 0.35 })} />
          </mesh>
        </OrbitBody>
      </group>

      <HoloGlobe />
      <RoboMascot position={[1.55, 0.45, 0.6]} scale={0.85} />

      <Sparkles count={30} scale={[5.5, 4.5, 3]} size={2.2} speed={0.25} opacity={0.6} color="#e9d5ff" />
    </Canvas>
  );
}
