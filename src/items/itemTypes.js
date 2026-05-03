import { ITEM_TYPES } from '../utils/constants.js';

export const ITEM_DEFINITIONS = {
  [ITEM_TYPES.FOOD]: {
    label: 'Food Package',
    color: 0x48c774,
    emissive: 0x062f16,
    mass: 0.8,
    useful: true,
    count: 8
  },
  [ITEM_TYPES.WATER]: {
    label: 'Water Bottle',
    color: 0x2d9cff,
    emissive: 0x041b33,
    mass: 0.7,
    useful: true,
    count: 8
  },
  [ITEM_TYPES.OXYGEN]: {
    label: 'Oxygen Tank',
    color: 0xffe45e,
    emissive: 0x332a02,
    mass: 1.4,
    useful: true,
    count: 7
  },
  [ITEM_TYPES.EXTINGUISHER]: {
    label: 'Fire Extinguisher',
    color: 0xff3030,
    emissive: 0x330505,
    mass: 1.2,
    useful: true,
    count: 5
  },
  [ITEM_TYPES.CRATE]: {
    label: 'Supply Crate',
    color: 0x9b6b3a,
    emissive: 0x130806,
    mass: 3.0,
    useful: true,
    count: 7
  },
  [ITEM_TYPES.DEBRIS]: {
    label: 'Debris',
    color: 0x777b82,
    emissive: 0x000000,
    mass: 2.2,
    useful: false,
    count: 14
  }
};
