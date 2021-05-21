import { controlKeyHandle, handlePlayerTankFunctions } from "/js/settings/control.js";
import { toggleStartScreen, toggleGameOverScreen } from "/js/functions/viewFunctions.js";
import { checkIsGameOver, gameOverFunction } from "/js/functions/checkStatuses.js";
import { levelInit } from "/js/functions/levelInit.js";
import { KeyPRESS, KeyUNPRESS } from "/js/settings/keyboardButtons.js";
import { createStore } from "/js/redux/createStore.js";
import { rootReducer } from "/js/redux/rootReducer.js";
import { subscribe } from "/js/models/subscribers.js";
import { restart } from "/js/redux/actionCreater.js";
import { LEVEL1 } from "/js/models/map.js";

document.addEventListener("keydown", (e) => controlKeyHandle(e, KeyPRESS));
document.addEventListener("keyup", (e) => controlKeyHandle(e, KeyUNPRESS));
document.addEventListener("click", (e) => startRestartGame(e));

const store = createStore(rootReducer);
subscribe(store);

function initialization() {
  levelInit(store, LEVEL1);
  gameloop();
}

function gameloop() {
  if (store.getState().IS_GAME_OVER) {
    gameOverFunction(store);
  } else {
    handlePlayerTankFunctions(store);
    checkIsGameOver(store);
    requestAnimationFrame(gameloop);
  }
}

function startRestartGame(e) {
  if (e.target.classList.contains("restart")) {
    restartGame();
  }
  if (e.target.classList.contains("start")) {
    startGame();
  }
}

function startGame() {
  toggleStartScreen();
  initialization();
}

function restartGame() {
  toggleGameOverScreen();
  store.dispatch(restart());
  initialization();
}
