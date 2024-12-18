import { ENEMY_TANK } from "./../models/types/modelTypes.js";
import { gameOver, nextLevel } from "./../redux/actionCreater.js";
import { activateGameOverScreen, activateNextLevelScreen, toggleGameOverScreen } from "./viewFunctions.js";
import { gameOverSound, moveSound, idlingSound } from "../audio/audio.js";
import { initialization } from "./../main.js";
import { LEVELS } from "../settings/maps.js";

export function gameOverHandler(store) {
  const enemiesTanks = store.getState().tanks.filter((tank) => tank.type == ENEMY_TANK);
  const enemiesLives = store.getState().enemiesCount;

  if (enemiesTanks.length === 0 && enemiesLives === 0 && !store.getState().IS_GAME_OVER) {
    if (store.getState().currentLevel < LEVELS.length - 1) {
      store.dispatch(gameOver());
      activateNextLevelScreen();
      setTimeout(() => {
        store.dispatch(nextLevel());
        toggleGameOverScreen();
        initialization();
      }, 3000);
    }

    if (store.getState().currentLevel === LEVELS.length - 1) {
      activateGameOverScreen();
      store.dispatch(gameOver());
    }
  }
}

export function gameOverFunction() {
  idlingSound.pause();
  moveSound.pause();
  setTimeout(() => {
    gameOverSound();
    toggleGameOverScreen();
  }, 1000);
}
