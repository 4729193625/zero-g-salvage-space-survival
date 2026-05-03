import { formatTime } from '../utils/math.js';

function barHTML(id, label) {
  return `
    <div class="hud-bar-row">
      <div class="hud-bar-label">${label}</div>
      <div class="hud-bar-track">
        <div id="${id}" class="hud-bar-fill"></div>
      </div>
      <div id="${id}-value" class="hud-bar-value">100</div>
    </div>
  `;
}

export class HUD {
  constructor(gameState) {
    this.gameState = gameState;

    this.root = document.createElement('div');
    this.root.id = 'hud';
    this.root.innerHTML = `
      <div class="hud-panel hud-left">
        <h1>ZERO-G SALVAGE</h1>
        ${barHTML('hunger-bar', 'Hunger')}
        ${barHTML('thirst-bar', 'Thirst')}
        ${barHTML('oxygen-bar', 'Oxygen')}
        ${barHTML('fuel-bar', 'Extinguisher')}
        <div class="hud-stat"><span>Survival Time</span><strong id="timer">00:00</strong></div>
        <div class="hud-stat"><span>Score</span><strong id="score">0</strong></div>
        <div class="hud-stat"><span>Stored Items</span><strong id="stored">0</strong></div>
        <div class="hud-stat"><span>Scanner</span><strong id="scanner">READY</strong></div>
        <div class="hud-stat"><span>Nearest Supply</span><strong id="nearest">--</strong></div>
      </div>

      <div id="crosshair">+</div>
      <div id="warning"></div>
      <div id="pickup-feedback"></div>

      <div class="hud-panel hud-help">
        <strong>Controls</strong><br />
        Click: mouse lock · Mouse: look<br />
        WASD: drift thrust · Space/Left Click: extinguisher<br />
        E: grab/drop · Hold/Release Left Click: throw<br />
        C: consume held resource · F: flashlight · R: scanner
      </div>

      <div id="game-over" class="hidden">
        <h2>MISSION FAILED</h2>
        <p id="game-over-reason"></p>
        <p>Refresh the page to restart.</p>
      </div>
    `;

    document.body.appendChild(this.root);

    this.elements = {
      hunger: document.querySelector('#hunger-bar'),
      hungerValue: document.querySelector('#hunger-bar-value'),
      thirst: document.querySelector('#thirst-bar'),
      thirstValue: document.querySelector('#thirst-bar-value'),
      oxygen: document.querySelector('#oxygen-bar'),
      oxygenValue: document.querySelector('#oxygen-bar-value'),
      fuel: document.querySelector('#fuel-bar'),
      fuelValue: document.querySelector('#fuel-bar-value'),
      timer: document.querySelector('#timer'),
      score: document.querySelector('#score'),
      stored: document.querySelector('#stored'),
      scanner: document.querySelector('#scanner'),
      nearest: document.querySelector('#nearest'),
      warning: document.querySelector('#warning'),
      feedback: document.querySelector('#pickup-feedback'),
      gameOver: document.querySelector('#game-over'),
      gameOverReason: document.querySelector('#game-over-reason')
    };

    this.feedbackTimer = 0;
  }

  setBar(element, valueElement, value) {
    const rounded = Math.round(value);
    element.style.width = `${rounded}%`;
    valueElement.textContent = rounded;
  }

  showFeedback(message) {
    this.elements.feedback.textContent = message;
    this.elements.feedback.classList.add('visible');
    this.feedbackTimer = 1.4;
  }

  update(delta, scannerCooldown) {
    const state = this.gameState;

    this.setBar(this.elements.hunger, this.elements.hungerValue, state.hunger);
    this.setBar(this.elements.thirst, this.elements.thirstValue, state.thirst);
    this.setBar(this.elements.oxygen, this.elements.oxygenValue, state.oxygen);
    this.setBar(this.elements.fuel, this.elements.fuelValue, state.fuel);

    this.elements.timer.textContent = formatTime(state.time);
    this.elements.score.textContent = state.score;
    this.elements.stored.textContent = state.stored;
    this.elements.scanner.textContent = scannerCooldown <= 0 ? 'READY' : `${scannerCooldown.toFixed(1)}s`;
    this.elements.nearest.textContent = state.nearestSupplyDistance == null
      ? '--'
      : `${state.nearestSupplyDistance.toFixed(1)}m`;

    this.elements.warning.textContent = state.warning;
    this.elements.warning.classList.toggle('visible', Boolean(state.warning));
    document.body.classList.toggle('danger', state.oxygen < 25 || state.warning.includes('Signal') || state.warning.includes('Return'));

    if (this.feedbackTimer > 0) {
      this.feedbackTimer -= delta;
      if (this.feedbackTimer <= 0) {
        this.elements.feedback.classList.remove('visible');
      }
    }

    if (state.gameOver) {
      this.elements.gameOver.classList.remove('hidden');
      this.elements.gameOverReason.textContent = `${state.gameOverReason} · Final time: ${formatTime(state.time)} · Score: ${state.score}`;
    }
  }
}
