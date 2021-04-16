import {
  PAUSE,
  
  DELETE_ENEMY,
  ADD_WALL,
  ADD_TANK,
  
} from "./types.js";

export function pauseGame() {
  return {
    type: PAUSE,
  };
}
export function deleteEnemy(enemy) {
  return {
    type: DELETE_ENEMY,
    tank: enemy,
  };
}

export function add_wall(wall) {
  return {
    type: ADD_WALL,
    wall: wall
  };
}
export function add_tank(tank) {
  return {
    type: ADD_TANK,
    tank: tank
  };
}
