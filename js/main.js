import { controlKeyHandle, handlePlayerTankFunctions } from "./settings/control.js";
import { checkIsGameOver, gameOverFunction } from "./functions/checkStatuses.js";
import { levelInit } from "./functions/levelInit.js";
import { KeyPRESS, KeyUNPRESS } from "./settings/keyboardButtons.js";
import { createStore } from "./redux/createStore.js";
import { rootReducer } from "./redux/rootReducer.js";
import { subscribe } from "./functions/subscribers.js";
import { startRestartGame } from "./functions/startRestart.js";

const store = createStore(rootReducer);
subscribe(store);

document.addEventListener("keydown", (e) => controlKeyHandle(e, KeyPRESS));
document.addEventListener("keyup", (e) => controlKeyHandle(e, KeyUNPRESS));
document.addEventListener("click", (e) => startRestartGame(e, store, initialization));

export function initialization() {
  levelInit(store);
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
