import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { ITEM_TYPES, RESOURCE_VALUES } from '../utils/constants.js';
import { randomBetween, randomVectorInShell } from '../utils/random.js';
import { createBoxBody, createCylinderBody, createSphereBody } from '../physics/createBodies.js';
import { syncMeshToBody, applySelfFriction } from '../physics/syncPhysics.js';
import { ITEM_DEFINITIONS } from './itemTypes.js';
import { createItemMesh } from './createItems.js';

function createBodyForType(type, definition, position) {
  if (type === ITEM_TYPES.FOOD) {
    return createBoxBody({ size: new THREE.Vector3(0.9, 0.55, 0.25), mass: definition.mass, position });
  }

  if ([ITEM_TYPES.WATER, ITEM_TYPES.OXYGEN, ITEM_TYPES.EXTINGUISHER].includes(type)) {
    return createCylinderBody({ radiusTop: 0.32, radiusBottom: 0.32, height: 1.1, mass: definition.mass, position });
  }

  if (type === ITEM_TYPES.CRATE) {
    return createBoxBody({ size: new THREE.Vector3(1.2, 1.2, 1.2), mass: definition.mass, position });
  }

  return createSphereBody({ radius: 0.65, mass: definition.mass, position });
}

export class ItemManager {
  constructor(scene, world, gameState, settings) {
    this.scene = scene;
    this.world = world;
    this.gameState = gameState;
    this.settings = settings;
    this.items = [];
  }

  spawnInitialItems() {
    Object.entries(ITEM_DEFINITIONS).forEach(([type, definition]) => {
      for (let i = 0; i < definition.count; i += 1) {
        this.spawnItem(type);
      }
    });
  }

  spawnItem(type) {
    const definition = ITEM_DEFINITIONS[type];
    const position = randomVectorInShell(14, 42);
    position.y += randomBetween(-7, 7);

    const mesh = createItemMesh(type, definition);
    mesh.position.copy(position);
    mesh.rotation.set(randomBetween(0, Math.PI), randomBetween(0, Math.PI), randomBetween(0, Math.PI));
    this.scene.add(mesh);

    const body = createBodyForType(type, definition, position);
    body.velocity.set(randomBetween(-0.7, 0.7), randomBetween(-0.35, 0.35), randomBetween(-0.7, 0.7));
    body.angularVelocity.set(randomBetween(-0.7, 0.7), randomBetween(-0.7, 0.7), randomBetween(-0.7, 0.7));
    this.world.addBody(body);

    const item = {
      id: crypto.randomUUID?.() ?? `${type}-${Date.now()}-${Math.random()}`,
      type,
      label: definition.label,
      useful: definition.useful,
      mesh,
      body,
      held: false,
      stored: false,
      consumed: false,
      scanTimer: 0
    };

    mesh.userData.item = item;
    this.items.push(item);
    return item;
  }

  removeItem(item) {
    this.scene.remove(item.mesh);
    this.world.removeBody(item.body);
    this.items = this.items.filter((candidate) => candidate !== item);
  }

  findNearestItem(position, maxDistance = 3.2) {
    let nearest = null;
    let nearestDistance = Infinity;

    this.items.forEach((item) => {
      if (item.held || item.stored || item.consumed) return;
      const distance = item.mesh.position.distanceTo(position);
      if (distance < maxDistance && distance < nearestDistance) {
        nearest = item;
        nearestDistance = distance;
      }
    });

    return nearest;
  }

  updateNearestSupplyDistance(position) {
    let nearest = Infinity;
    this.items.forEach((item) => {
      if (!item.useful || item.held || item.stored || item.consumed) return;
      nearest = Math.min(nearest, item.mesh.position.distanceTo(position));
    });
    this.gameState.nearestSupplyDistance = Number.isFinite(nearest) ? nearest : null;
  }

  consumeItem(item) {
    const values = RESOURCE_VALUES[item.type];
    if (!values) return false;
    this.gameState.restore(values);
    item.consumed = true;
    this.removeItem(item);
    return true;
  }

  update(delta, playerPosition) {
    this.updateNearestSupplyDistance(playerPosition);

    this.items.forEach((item) => {
      if (!item.held) {
        if (this.settings.selfFriction) {
          applySelfFriction(item.body, this.settings.selfFrictionStrength);
        }
        syncMeshToBody(item.mesh, item.body);
      }

      if (item.scanTimer > 0) {
        item.scanTimer -= delta;
        if (item.scanTimer <= 0) {
          item.mesh.material.emissive.setHex(item.mesh.userData.originalEmissive);
          item.mesh.material.emissiveIntensity = item.mesh.userData.originalEmissiveIntensity;
        }
      }
    });
  }
}
