import { moveSound } from "../audio/audio.js";
import { PLAYER_TANK } from "./../models/types/modelTypes.js";
import { KeyA, KeyD, KeyPRESS, KeyS, KeySPACE, KeyUNPRESS, KeyW } from "./../settings/keyboardButtons.js";

const pressedKeys = [];
let pressedSpace = false;
const keyCodes = [KeyW, KeyS, KeyA, KeyD, KeySPACE];

export function controlKeyHandle(e, keyState) {
  if (keyCodes.indexOf(e.keyCode) !== -1) {
    _handleKey(e.keyCode, keyState);
  }
}

export function handlePlayerTankFunctions(store) {
  const tank = store.getState().tanks.filter((tank) => tank.type == PLAYER_TANK)[0];

  if (pressedSpace) {
    tank.shot();
  }

  if (pressedKeys.length === 0) {
    moveSound.pause();
  }

  if (pressedKeys.length > 0) {
    moveSound.play();

    const key = pressedKeys[pressedKeys.length - 1];
    if (key === KeyW) {
      tank.moveUp();
    }
    if (key === KeyS) {
      tank.moveDown();
    }
    if (key === KeyA) {
      tank.moveLeft();
    }
    if (key === KeyD) {
      tank.moveRight();
    }
  }
}

function _handleKey(keyCode, keyState) {
  if (keyState === KeyPRESS) {
    _addKey(keyCode);
  }
  if (keyState === KeyUNPRESS) {
    _deleteKey(keyCode);
  }
}

function _addKey(key) {
  if (key === KeySPACE) {
    pressedSpace = true;
  } else {
    const index = pressedKeys.indexOf(key);
    if (index === -1) {
      pressedKeys.push(key);
    }
  }
}

function _deleteKey(key) {
  if (key === KeySPACE) {
    pressedSpace = false;
  } else {
    const index = pressedKeys.indexOf(key);
    if (index > -1) {
      pressedKeys.splice(index, 1);
    }
  }
}
