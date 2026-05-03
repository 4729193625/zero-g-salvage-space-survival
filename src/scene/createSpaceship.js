import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function createSpaceship(scene, world) {
  const group = new THREE.Group();
  group.name = 'Spaceship Base';

  const hullMaterial = new THREE.MeshStandardMaterial({
    color: 0x8d98aa,
    metalness: 0.75,
    roughness: 0.28
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x111827,
    metalness: 0.5,
    roughness: 0.5
  });
  const glowMaterial = new THREE.MeshStandardMaterial({
    color: 0x88bbff,
    emissive: 0x2244ff,
    emissiveIntensity: 1.1
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(7, 3, 13), hullMaterial);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(2.2, 4, 24), hullMaterial);
  nose.rotation.x = Math.PI / 2;
  nose.position.z = -8.5;
  group.add(nose);

  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(1.25, 24, 16), glowMaterial);
  cockpit.scale.set(1.2, 0.55, 0.8);
  cockpit.position.set(0, 1.7, -3.2);
  group.add(cockpit);

  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.25, 4), darkMaterial);
  leftWing.position.set(-5.8, -0.5, 1.2);
  group.add(leftWing);

  const rightWing = leftWing.clone();
  rightWing.position.x = 5.8;
  group.add(rightWing);

  const engineLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 2, 18), darkMaterial);
  engineLeft.rotation.x = Math.PI / 2;
  engineLeft.position.set(-1.9, -0.6, 7.2);
  group.add(engineLeft);

  const engineRight = engineLeft.clone();
  engineRight.position.x = 1.9;
  group.add(engineRight);

  scene.add(group);

  const physicsBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Box(new CANNON.Vec3(3.5, 1.5, 6.5)),
    position: new CANNON.Vec3(0, 0, 0)
  });
  world.addBody(physicsBody);

  return { mesh: group, body: physicsBody };
}
