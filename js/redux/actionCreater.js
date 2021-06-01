import {
  DELETE_TANK,
  ADD_WALL,
  ADD_TANK,
  DELETE_WALL,
  DECREMENT_ENEMIES_LIVE,
  GAME_OVER,
  RESTART,
  NEXT_LEVEL,
  RESUME_GAME,
} from "./reducerTypes.js";

export function pauseGame() {
  return {
    type: PAUSE,
  };
}
export function restart() {
  return {
    type: RESTART,
  };
}
export function gameOver() {
  return {
    type: GAME_OVER,
  };
}

export function add_wall(wall) {
  return {
    type: ADD_WALL,
    wall: wall,
  };
}

export function deleteWall(wall) {
  return {
    type: DELETE_WALL,
    wall: wall,
  };
}

export function add_tank(tank) {
  return {
    type: ADD_TANK,
    tank: tank,
  };
}

export function deleteTank(tank) {
  return {
    type: DELETE_TANK,
    tank: tank,
  };
}

export function decrementEnemyTank() {
  return {
    type: DECREMENT_ENEMIES_LIVE,
  };
}

export function nextLevel() {
  return {
    type: NEXT_LEVEL,
  };
}

export function resumeGame() {
  return {
    type: RESUME_GAME,
  };
}
