export function syncMeshToBody(mesh, body) {
  mesh.position.copy(body.position);
  mesh.quaternion.copy(body.quaternion);
}

export function applySelfFriction(body, strength) {
  body.velocity.scale(strength, body.velocity);
  body.angularVelocity.scale(strength, body.angularVelocity);
}
