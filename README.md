# Zero-G Salvage: Space Survival

A playable WebGL-based 3D browser survival prototype built with Three.js, cannon-es, lil-gui, and Vite.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the localhost URL shown by Vite.

## Controls

- Click screen: lock mouse
- Mouse: look around freely
- WASD: small directional zero-g thrust
- Space / Left Mouse: fire extinguisher thrust
- Shift: stronger thrust while fuel exists
- E: grab/drop nearby item
- Hold Left Mouse while holding item: charge throw
- Release Left Mouse while holding item: throw item
- C: consume held food/water/oxygen/extinguisher
- F: toggle flashlight
- R: scanner ping
- Esc: unlock mouse

## Gameplay

Survive near the spaceship. Hunger, thirst, and oxygen decrease over time. Use resources, throw useful items into the glowing storage zone, and avoid drifting outside the communication range.

This prototype uses procedural placeholder materials. You can later add real textures inside `public/textures` and load them with `THREE.TextureLoader`.
