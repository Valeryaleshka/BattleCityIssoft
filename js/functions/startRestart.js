import { restart } from "../redux/actionCreater.js";
import { toggleGameOverScreen, toggleStartScreen } from "./viewFunctions.js";

export function startRestartGame(e, store, initializationFunction) {
  if (e.target.classList.contains("restart")) {
    _restartGame(store, initializationFunction);
  }
  if (e.target.classList.contains("start")) {
    _startGame(initializationFunction);
  }
}

function _startGame(initializationFunction) {
  toggleStartScreen();
  initializationFunction();
}

function _restartGame(store, initializationFunction) {
  toggleGameOverScreen();
  store.dispatch(restart());
  initializationFunction();
}
