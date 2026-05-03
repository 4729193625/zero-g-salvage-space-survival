export class SurvivalSystem {
  constructor(gameState, settings) {
    this.gameState = gameState;
    this.settings = settings;
  }

  update(delta) {
    this.gameState.updateTimer(delta);
    this.gameState.drain(delta, this.settings);
  }
}
