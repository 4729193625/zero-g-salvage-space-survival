import * as THREE from 'three';
import { ITEM_TYPES } from '../utils/constants.js';

export function createItemMesh(type, definition) {
  const material = new THREE.MeshStandardMaterial({
    color: definition.color,
    emissive: definition.emissive,
    emissiveIntensity: 0.25,
    roughness: 0.55,
    metalness: type === ITEM_TYPES.OXYGEN || type === ITEM_TYPES.EXTINGUISHER ? 0.35 : 0.05
  });

  let geometry;

  switch (type) {
    case ITEM_TYPES.FOOD:
      geometry = new THREE.BoxGeometry(0.9, 0.55, 0.25);
      break;
    case ITEM_TYPES.WATER:
      geometry = new THREE.CylinderGeometry(0.22, 0.22, 0.95, 18);
      break;
    case ITEM_TYPES.OXYGEN:
      geometry = new THREE.CylinderGeometry(0.32, 0.32, 1.35, 20);
      break;
    case ITEM_TYPES.EXTINGUISHER:
      geometry = new THREE.CapsuleGeometry(0.28, 0.75, 8, 16);
      break;
    case ITEM_TYPES.CRATE:
      geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      break;
    default:
      geometry = new THREE.DodecahedronGeometry(0.65, 0);
      break;
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.originalEmissive = material.emissive.getHex();
  mesh.userData.originalEmissiveIntensity = material.emissiveIntensity;

  return mesh;
}
