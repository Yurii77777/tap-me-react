import { Box } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { styles } from './styles';

export const Coin = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/coin.glb',
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        const containerSize = Math.min(currentMount.clientWidth, currentMount.clientHeight);
        const maxModelSize = Math.max(size.x, size.y, size.z);
        const scale = (containerSize * 0.03) / maxModelSize;
        model.scale.set(scale, scale, scale);

        scene.add(model);

        camera.position.set(0, 0, containerSize / 25);
        camera.lookAt(0, 0, 0);

        const animate = () => {
          requestAnimationFrame(animate);
          model.rotation.y += 0.07;
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error('Помилка завантаження моделі:', error);
      },
    );

    return () => {
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <Box ref={mountRef} style={styles} />;
};
