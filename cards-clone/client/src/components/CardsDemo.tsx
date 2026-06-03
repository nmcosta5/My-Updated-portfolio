import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture } from '@react-three/drei'
import { easing } from 'maath'
import * as THREE from 'three'
import '@/lib/three-utils'

interface CardProps {
  url: string
  position: [number, number, number]
  rotation: [number, number, number]
}

function Rig(props: any) {
  const ref = useRef<THREE.Group>(null)
  const scroll = useScroll()
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2)
    }
    state.events.update?.()
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })

  return <group ref={ref} {...props} />
}

function Carousel({ radius = 1.4, count = 8 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Card
          key={i}
          url={`/img${Math.floor(i % 10) + 1}_.jpg`}
          position={[
            Math.sin((i / count) * Math.PI * 2) * radius,
            0,
            Math.cos((i / count) * Math.PI * 2) * radius,
          ]}
          rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        />
      ))}
    </>
  )
}

function Card({ url, position, rotation }: CardProps) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, hover] = useState(false)

  const pointerOver = (e: any) => {
    e.stopPropagation()
    hover(true)
  }
  const pointerOut = () => hover(false)

  useFrame((state, delta) => {
    if (ref.current) {
      easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
      const material = ref.current.material as any
      if (material) {
        easing.damp(material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
        easing.damp(material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
      }
    }
  })

  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      position={position}
      rotation={rotation}
    >
      {/* @ts-ignore */}
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  )
}

function Banner(props: any) {
  const ref = useRef<THREE.Mesh>(null)
  const texture = useTexture('/work_.png')
  const scroll = useScroll()

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  useFrame((state, delta) => {
    if (ref.current && ref.current.material) {
      const material = ref.current.material as any
      if (material.time) {
        material.time.value += Math.abs(scroll.delta) * 4
      }
      if (material.map) {
        material.map.offset.x += delta / 2
      }
    }
  })

  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      {/* @ts-ignore */}
      <meshSineMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  )
}

export function CardsDemo() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={['#a79', 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
          <Banner position={[0, -0.15, 0]} />
        </ScrollControls>
        <Environment preset="dawn" background blur={0.5} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <a
          href="https://pmnd.rs/"
          className="absolute bottom-10 left-24 text-sm pointer-events-auto hover:opacity-70 transition-opacity"
        >
          pmnd.rs
          <br />
          dev collective
        </a>
        <div className="absolute bottom-10 right-10 text-sm">02/06/2026</div>
        <a
          href="#"
          className="absolute top-10 left-10 text-sm pointer-events-auto hover:opacity-70 transition-opacity"
        >
          scroll up/down ...
        </a>
      </div>
    </div>
  )
}
