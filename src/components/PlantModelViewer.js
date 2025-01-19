import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  const meshRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation.x;
      meshRef.current.rotation.y += 0.01; // Constant slow rotation
    }
  });

  return (
    <mesh ref={meshRef}>
      <primitive object={gltf.scene} scale={20} />
    </mesh>
  );
}

export default function PlantModelViewer({ modelUrl }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      setRotation(prev => ({
        x: prev.x + gestureState.dy * 0.01,
        y: prev.y + gestureState.dx * 0.01,
      }));
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model url={modelUrl} />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
  },
});

