import * as THREE from 'three';
import { randomBetween } from '../utils/random.js';

function createStarField() {
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < 1700; i += 1) {
    positions.push(
      randomBetween(-450, 450),
      randomBetween(-450, 450),
      randomBetween(-450, 450)
    );
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.9,
    sizeAttenuation: true
  });

  return new THREE.Points(geometry, material);
}

function createPlanet({ radius, position, color, emissive = 0x000000, roughness = 0.8 }) {
  const geometry = new THREE.SphereGeometry(radius, 48, 32);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive,
    roughness
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  return mesh;
}

export function createEnvironment(scene) {
  const stars = createStarField();
  scene.add(stars);

  const earth = createPlanet({
    radius: 14,
    position: new THREE.Vector3(95, -42, -160),
    color: 0x2878d8,
    emissive: 0x00142e,
    roughness: 0.65
  });
  scene.add(earth);

  // Simple procedural land patches so the Earth is not just a plain blue ball.
  for (let i = 0; i < 11; i += 1) {
    const patch = new THREE.Mesh(
      new THREE.SphereGeometry(randomBetween(1.2, 3.2), 12, 8),
      new THREE.MeshStandardMaterial({ color: 0x2aaa55, roughness: 0.85 })
    );
    patch.position.copy(earth.position).add(new THREE.Vector3(
      randomBetween(-7, 7),
      randomBetween(-5, 5),
      randomBetween(-7, 7)
    ).normalize().multiplyScalar(14.25));
    patch.scale.set(1.3, 0.35, 0.7);
    patch.lookAt(earth.position);
    scene.add(patch);
  }

  const moon = createPlanet({
    radius: 6,
    position: new THREE.Vector3(-80, 30, -115),
    color: 0x888888,
    roughness: 1
  });
  scene.add(moon);

  const sun = createPlanet({
    radius: 8,
    position: new THREE.Vector3(-80, 45, -90),
    color: 0xffd27a,
    emissive: 0xffb347,
    roughness: 0.2
  });
  scene.add(sun);

  return { stars, earth, moon, sun };
}
