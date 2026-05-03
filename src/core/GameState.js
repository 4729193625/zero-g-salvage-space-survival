import { clamp } from '../utils/math.js';

export class GameState {
  constructor() {
    this.hunger = 100;
    this.thirst = 100;
    this.oxygen = 100;
    this.fuel = 100;
    this.score = 0;
    this.stored = 0;
    this.time = 0;
    this.warning = '';
    this.gameOver = false;
    this.gameOverReason = '';
    this.nearestSupplyDistance = null;
  }

  updateTimer(delta) {
    if (!this.gameOver) this.time += delta;
  }

  drain(delta, settings) {
    if (this.gameOver) return;

    this.hunger = clamp(this.hunger - settings.hungerDrain * delta);
    this.thirst = clamp(this.thirst - settings.thirstDrain * delta);
    this.oxygen = clamp(this.oxygen - settings.oxygenDrain * delta);

    if (this.hunger <= 0) this.end('STARVATION — MISSION FAILED');
    if (this.thirst <= 0) this.end('DEHYDRATION — MISSION FAILED');
    if (this.oxygen <= 0) this.end('OXYGEN DEPLETED — MISSION FAILED');
  }

  useFuel(amount) {
    if (this.gameOver || this.fuel <= 0) return false;
    this.fuel = clamp(this.fuel - amount);
    return true;
  }

  restore(values = {}) {
    if (values.hunger) this.hunger = clamp(this.hunger + values.hunger);
    if (values.thirst) this.thirst = clamp(this.thirst + values.thirst);
    if (values.oxygen) this.oxygen = clamp(this.oxygen + values.oxygen);
    if (values.fuel) this.fuel = clamp(this.fuel + values.fuel);
  }

  addStoredItem() {
    this.stored += 1;
    this.score += 10;
  }

  end(reason) {
    if (this.gameOver) return;
    this.gameOver = true;
    this.gameOverReason = reason;
    this.warning = reason;
  }

  restart() {
    this.hunger = 100;
    this.thirst = 100;
    this.oxygen = 100;
    this.fuel = 100;
    this.score = 0;
    this.stored = 0;
    this.time = 0;
    this.warning = '';
    this.gameOver = false;
    this.gameOverReason = '';
    this.nearestSupplyDistance = null;
  }
}
