import { gameOverSound } from "./../audio/audio.js";
import { ENEMY_TANK } from "./../models/modelTypes.js";
import { gameOver } from "./../redux/actionCreater.js";
import { toggleGameOverScreen } from "./../functions/viewFunctions.js";

export function checkIsGameOver(store) {
  setTimeout(() => _checkGameOver(store), 2000);
}

function _checkGameOver(store) {
  const enemiesTanks = store.getState().tanks.filter((tank) => tank.type == ENEMY_TANK);
  const enemiesLives = store.getState().enemiesCount;

  if (enemiesTanks.length === 0 && enemiesLives === 0) {
    store.dispatch(gameOver());
  }
}

export function gameOverFunction() {
  setTimeout(() => {
    gameOverSound();
    toggleGameOverScreen();
  }, 2000);
}
