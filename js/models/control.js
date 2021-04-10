import {
  KeyA,
  KeyD,
  KeyDOWN,
  KeyLEFT,
  KeyPRESS,
  KeyRIGHT,
  KeyS,
  KeySPACE,
  KeyUNPRESS,
  KeyUP,
  KeyW,
} from "./keyboard.js";

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

export function handleTankFunctions(tank) {
  if(tank.$element){
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
  }else{
    tank.$element = tank.createElement();    
    tank.positionTop = 576;
    tank.positionLeft = 288;
    tank.draw();
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
