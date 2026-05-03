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
- WASD: directional zero-g thrust
- Shift: vertical thrust up
- Ctrl: vertical thrust down
- Alt: boost while moving
- Space / Left Mouse: fire extinguisher thrust, spraying forward and moving backward
- E: grab/drop nearby item
- Hold Left Mouse while holding item: charge throw
- Release Left Mouse while holding item: throw item
- C: consume held food/water/oxygen/extinguisher/crate
- F: toggle flashlight
- R: scanner ping
- G: show/hide settings panel
- Esc: unlock mouse

## Gameplay

Survive near the spaceship. Hunger, thirst, oxygen, and extinguisher fuel matter. Throw useful items into the glowing storage zone to store them.

Stored items are now real inventory, not just score. If a matching bar goes below the critical threshold, the game can automatically use a stored resource:

- Food restores hunger
- Water restores thirst
- Oxygen tanks restore oxygen
- Fire extinguishers restore fuel
- Emergency crates restore a smaller amount of multiple resources

## Item variants

Each item type now has small, medium, and large variants.

- Small items are lighter, easier to throw, and restore less.
- Medium items are the balanced default.
- Large items are heavier, harder to throw, and restore more.

This applies to food, water, oxygen tanks, fire extinguishers, crates, and debris.

## Added in v2

- Restart mission button on the game-over screen
- Player self-friction, separate from item self-friction
- Stronger Sun lighting and visible sun glow
- Shift/Ctrl vertical movement
- Alt boost movement
- Settings/debug panel hidden by default and toggled with G
- Stored item inventory display
- Auto-use stored resources when critical
- Small/medium/large item variants with different mass, size, score, and restore values
- Velocity and held-item/throw-charge HUD readouts

## Assets

This prototype uses procedural placeholder materials. You can later add real textures inside `public/textures` and load them with `THREE.TextureLoader`.

Sound folders are prepared in `public/sounds`, but sound effects are still placeholders/not implemented.
