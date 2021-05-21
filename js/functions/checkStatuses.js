import { gameOverSound } from "/js/audio/audio.js";
import { ENEMY_TANK } from "/js/models/modelTypes.js";
import { gameOver } from "/js/redux/actionCreater.js";
import { toggleGameOverScreen } from "/js/functions/viewFunctions.js";

export function checkIsGameOver(store) {
  setTimeout(() => checkGameOver(store), 2000);
}

function checkGameOver(store) {
  const enemiesTanks = store.getState().tanks.filter((tank) => tank.type == ENEMY_TANK);
  const enemiesLives = store.getState().enemiesCount;

  if (enemiesTanks.length === 0 && enemiesLives === 0) {
    document.getElementById("gameOverText").innerText = "You Win";
    store.dispatch(gameOver());
  }
}

export function gameOverFunction(store) {
  store.dispatch(gameOver());
  setTimeout(() => {
    gameOverSound();
    toggleGameOverScreen();
  }, 2000);
}
