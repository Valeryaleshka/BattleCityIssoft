import { add_wall } from "./../redux/actionCreater.js";
import { BrickWall } from "./../models/walls/brickWall.js";
import { LEVELS, MAP_LEGEND } from "../settings/maps.js";
import { BLOCK_SIZE, PLAYER_1_LEFT_POSITION, PLAYER_1_TOP_POSITION } from "./../settings/gameSettings.js";
import { PlayerTank } from "./../models/tanks/playerTank.js";
import { initiateAI } from "./artificialIntelligence.js";
import { SteelWall } from "../models/walls/steelWall.js";
import { PlayerBase } from "../models/walls/base.js";
import { startSound, idlingSound, unmuteTankSound } from "../audio/audio.js";

export function levelInit(store) {
  initiateAI(store);
  _initPlayer(store);
  _initMap(store);
  startSound();
  idlingSound.play();
  setTimeout(() => {
    unmuteTankSound();
  }, 4200);
}

function _initPlayer(store) {
  const playertank = new PlayerTank(PLAYER_1_TOP_POSITION, PLAYER_1_LEFT_POSITION, store);
  playertank.draw();
}

function _initMap(store) {
  const currentLevel = LEVELS[store.getState().currentLevel];
  for (let i = 0; i < currentLevel.length; i++) {
    const positionTop = i * BLOCK_SIZE;
    for (let j = 0; j < currentLevel[i].length; j++) {
      const positionLeft = j * BLOCK_SIZE;

      if (currentLevel[i][j] != MAP_LEGEND.NO_WALL) {
        let wall;

        if (currentLevel[i][j] == MAP_LEGEND.STEEL_WALL) {
          wall = new SteelWall(positionTop, positionLeft, store);
        }
        if (currentLevel[i][j] == MAP_LEGEND.BRICK_WALL) {
          wall = new BrickWall(positionTop, positionLeft, store);
        }
        if (currentLevel[i][j] == MAP_LEGEND.BASE) {
          wall = new PlayerBase(positionTop, positionLeft, store);
        }

        store.dispatch(add_wall(wall));
        wall.draw();
      }
    }
  }
}
