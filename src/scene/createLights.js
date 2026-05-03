import * as THREE from 'three';

export function createLights(scene) {
  const ambient = new THREE.AmbientLight(0x1d2a4a, 0.22);
  scene.add(ambient);

  const sunLight = new THREE.PointLight(0xfff0c0, 3.8, 600, 1.2);
  sunLight.position.set(-80, 45, -90);
  sunLight.castShadow = true;
  scene.add(sunLight);

  const weakFill = new THREE.DirectionalLight(0x6075ff, 0.35);
  weakFill.position.set(40, -20, 30);
  scene.add(weakFill);

  return { ambient, sunLight, weakFill };
}
