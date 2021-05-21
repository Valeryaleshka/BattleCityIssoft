import {
  INIT,
  DELETE_TANK,
  ADD_WALL,
  ADD_TANK,
  DELETE_WALL,
  DECREMENT_ENEMIES_LIVE,
  GAME_OVER,
  RESTART,
  PAUSE,
} from "./reducerTypes.js";
import { PLAYER_TANK } from "./../models/modelTypes.js";

export function rootReducer(state, action) {
  if (action.type === INIT) {
    return {
      tanks: [],
      walls: [],
      enemiesCount: 21,
      playerLives: 3,
      isPaused: false,
      IS_GAME_OVER: false,
    };
  }

  if (action.type === RESTART) {
    document.querySelector("#gamefield").innerHTML = "";
    return {
      tanks: [],
      walls: [],
      enemiesCount: 21,
      playerLives: 3,
      isPaused: false,
      IS_GAME_OVER: false,
    };
  }

  if (action.type === PAUSE) {
    return { ...state, isPaused: !state.isPaused };
  }

  if (action.type === ADD_WALL) {
    const temp = state.walls.slice(0);
    temp.push(action.wall);

    return { ...state, walls: temp };
  }

  if (action.type === DELETE_WALL) {
    const indexOfWall = state.walls.indexOf(action.wall);
    const temp = state.walls.splice(indexOfWall, 1);

    return { ...state };
  }

  if (action.type === ADD_TANK) {
    const temp = state.tanks.slice(0);
    temp.push(action.tank);
    return { ...state, tanks: temp };
  }

  if (action.type === DELETE_TANK) {
    const indexOfTank = state.tanks.indexOf(action.tank);
    const temp = state.tanks.splice(indexOfTank, 1);

    if (action.tank.type === PLAYER_TANK) {
      const temp = state.playerLives - 1;

      return { ...state, playerLives: temp };
    } else {
      return { ...state };
    }
  }

  if (action.type === DECREMENT_ENEMIES_LIVE) {
    const temp = state.enemiesCount - 1;
    return { ...state, enemiesCount: temp };
  }

  if (action.type === GAME_OVER) {
    return { ...state, IS_GAME_OVER: true };
  }
}
