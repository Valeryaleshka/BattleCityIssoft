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
  NEXT_LEVEL,
  RESUME_GAME,
} from "./reducerTypes.js";
import { PLAYER_TANK } from "./../models//types/modelTypes.js";
import { ENEMIES_COUNT, INITIAL_PARAMETERS } from "../settings/gameSettings.js";
import { muteTankSound } from "../audio/audio.js";
import { clearGameField } from "../functions/viewFunctions.js";

export function rootReducer(state, action) {
  if (action.type === INIT) {
    return INITIAL_PARAMETERS;
  }

  if (action.type === RESTART) {
    clearGameField();
    return INITIAL_PARAMETERS;
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
    muteTankSound();
    return { ...state, IS_GAME_OVER: true };
  }

  if (action.type === NEXT_LEVEL) {
    const temp = state.currentLevel + 1;
    clearGameField();
    return { ...state, currentLevel: temp, IS_GAME_OVER: false, enemiesCount: ENEMIES_COUNT, walls: [], tanks: [] };
  }

  if (action.type === RESUME_GAME) {
    return { ...state, IS_GAME_OVER: false, enemiesCount: ENEMIES_COUNT };
  }
}
