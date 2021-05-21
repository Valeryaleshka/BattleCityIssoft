import { PLAYER_TANK } from "/js/models/modelTypes.js";
import { KeyA, KeyD, KeyPRESS, KeyS, KeySPACE, KeyUNPRESS, KeyW } from "/js/settings/keyboardButtons.js";

const pressedKeys = [];
let pressedSpace = false;

export function controlKeyHandle(e, keyState) {
  if (e.keyCode === KeyW) {
    _handleKey(KeyW, keyState);
  }
  if (e.keyCode === KeyS) {
    _handleKey(KeyS, keyState);
  }
  if (e.keyCode === KeyA) {
    _handleKey(KeyA, keyState);
  }
  if (e.keyCode === KeyD) {
    _handleKey(KeyD, keyState);
  }
  if (e.keyCode === KeySPACE) {
    _handleKey(KeySPACE, keyState);
  }
}

export function handlePlayerTankFunctions(store) {
  const tank = store.getState().tanks.filter((tank) => tank.type == PLAYER_TANK)[0];

  if (pressedSpace) {
    tank.shot();
  }
  if (pressedKeys.length > 0) {
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
