'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '@/lib/store'

function CarModel() {
  const meshRef = useRef<THREE.Group>(null)
  const { modifications } = useStore()

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = 0
    }
  }, [])

  // Create a simple car model using basic geometry
  return (
    <group ref={meshRef} position={[0, -0.5, 0]}>
      {/* Car body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 4]} />
        <meshStandardMaterial color={modifications.color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car cabin */}
      <mesh position={[0, 1.1, -0.3]} castShadow>
        <boxGeometry args={[1.6, 0.6, 2]} />
        <meshStandardMaterial color={modifications.color} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.1, 0.8]} castShadow>
        <boxGeometry args={[1.5, 0.5, 0.1]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.3} />
      </mesh>

      {/* Back window */}
      <mesh position={[0, 1.1, -1.3]} castShadow>
        <boxGeometry args={[1.5, 0.5, 0.1]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.3} />
      </mesh>

      {/* Wheels */}
      <Wheel position={[-0.9, 0, 1.2]} color={modifications.wheels === 'chrome' ? '#cccccc' : '#333333'} />
      <Wheel position={[0.9, 0, 1.2]} color={modifications.wheels === 'chrome' ? '#cccccc' : '#333333'} />
      <Wheel position={[-0.9, 0, -1.2]} color={modifications.wheels === 'chrome' ? '#cccccc' : '#333333'} />
      <Wheel position={[0.9, 0, -1.2]} color={modifications.wheels === 'chrome' ? '#cccccc' : '#333333'} />

      {/* Spoiler */}
      {modifications.spoiler !== 'none' && (
        <group>
          <mesh position={[0, 1.5, -2.2]} castShadow>
            <boxGeometry args={[1.8, 0.1, 0.4]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-0.7, 1.2, -2.2]} castShadow>
            <boxGeometry args={[0.1, 0.4, 0.3]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
          <mesh position={[0.7, 1.2, -2.2]} castShadow>
            <boxGeometry args={[0.1, 0.4, 0.3]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>
      )}

      {/* Headlights */}
      <mesh position={[-0.6, 0.6, 2.01]} castShadow>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color={modifications.headlights === 'led' ? '#ffffff' : '#ffffcc'}
          emissive={modifications.headlights === 'led' ? '#ffffff' : '#ffffcc'}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.6, 0.6, 2.01]} castShadow>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          color={modifications.headlights === 'led' ? '#ffffff' : '#ffffcc'}
          emissive={modifications.headlights === 'led' ? '#ffffff' : '#ffffcc'}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Exhaust */}
      {modifications.exhaust === 'dual' && (
        <>
          <mesh position={[-0.5, 0.2, -2.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.3, 32]} />
            <meshStandardMaterial color="#444444" metalness={0.9} />
          </mesh>
          <mesh position={[0.5, 0.2, -2.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.3, 32]} />
            <meshStandardMaterial color="#444444" metalness={0.9} />
          </mesh>
        </>
      )}

      {modifications.exhaust === 'sport' && (
        <mesh position={[0, 0.2, -2.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
          <meshStandardMaterial color="#ff4444" metalness={0.9} emissive="#ff0000" emissiveIntensity={0.2} />
        </mesh>
      )}

      {/* Bumper */}
      {modifications.bumper === 'sport' && (
        <mesh position={[0, 0.2, 2.1]} castShadow>
          <boxGeometry args={[2.2, 0.3, 0.2]} />
          <meshStandardMaterial color="#111111" metalness={0.7} />
        </mesh>
      )}
    </group>
  )
}

function Wheel({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.11, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
        <meshStandardMaterial color="#666666" metalness={0.9} />
      </mesh>
    </group>
  )
}

export default function Car3DViewer() {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 3, 5]} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
        />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        <CarModel />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#333333" metalness={0.2} roughness={0.8} />
        </mesh>

        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
