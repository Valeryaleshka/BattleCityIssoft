import {
  KeyA,
  KeyD,
  KeyDOWN,
  KeyLEFT,
  KeyPRESS,
  KeyRIGHT,
  KeyS,
  KeyUNPRESS,
  KeyUP,
  KeyW,
} from "./keyboard.js";

const pressedKeys = [];

export function controlKeyHandle(e, keyState) {
  if (e.keyCode === (KeyW || KeyUP)) {
    _handleKey(KeyW, keyState)
  }
  if (e.keyCode === (KeyS || KeyDOWN)) {
    _handleKey(KeyS, keyState)
  }
  if (e.keyCode === (KeyA || KeyLEFT)) {
    _handleKey(KeyA, keyState)
  }
  if (e.keyCode === (KeyD || KeyRIGHT)) {
    _handleKey(KeyD, keyState)
  }
}

export function moveTank(tank) {
  
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
  if(keyState === KeyPRESS){
    _addKey(keyCode);
  }
  if(keyState === KeyUNPRESS){
    _deleteKey(keyCode);
  }  
}

function _addKey(key) {
  const index = pressedKeys.indexOf(key);
  if (index === -1) {
    pressedKeys.push(key);
  }  
}

function _deleteKey(key) {
  const index = pressedKeys.indexOf(key);
  if (index > -1) {
    pressedKeys.splice(index, 1);
  }  
}