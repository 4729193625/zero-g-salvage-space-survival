export const PLAYER_START = { x: 0, y: 1.5, z: 12 };
export const FIXED_TIME_STEP = 1 / 60;
export const MAX_DELTA = 0.05;

export const ITEM_TYPES = {
  FOOD: 'food',
  WATER: 'water',
  OXYGEN: 'oxygen',
  EXTINGUISHER: 'extinguisher',
  CRATE: 'crate',
  DEBRIS: 'debris'
};

export const RESOURCE_VALUES = {
  food: { hunger: 35 },
  water: { thirst: 35 },
  oxygen: { oxygen: 45 },
  extinguisher: { fuel: 45 }
};

export const SCANNER_COLORS = {
  food: 0x39ff6a,
  water: 0x3ca0ff,
  oxygen: 0xffee55,
  extinguisher: 0xff4a4a,
  crate: 0xffffff,
  debris: 0xbbbbbb,
  base: 0xffffff
};
