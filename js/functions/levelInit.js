import { add_wall } from "./../redux/actionCreater.js";
import { BrickWall } from "./../models/brickWall.js";
import { MAP_LEGEND } from "./../models/map.js";
import { BLOCK_SIZE, PLAYER_1_LEFT_POSITION, PLAYER_1_TOP_POSITION } from "./../settings/gameSettings.js";
import { PlayerTank } from "./../models/playerTank.js";
import { initiateAI } from "./artificialIntelligence.js";
import { startSound } from "./../audio/audio.js";
import { SteelWall } from "../models/steelWall.js";

export function levelInit(store, level) {
  initiateAI(store);
  _initPlayer(store);
  _initMap(store, level);
  startSound();
}

function _initPlayer(store) {
  const playertank = new PlayerTank(PLAYER_1_TOP_POSITION, PLAYER_1_LEFT_POSITION, store);
  playertank.draw();
}

function _initMap(store, level) {
  for (let i = 0; i < level.length; i++) {
    const positionTop = i * BLOCK_SIZE;
    for (let j = 0; j < level[i].length; j++) {
      const positionLeft = j * BLOCK_SIZE;

      if (level[i][j] != MAP_LEGEND.NO_WALL) {
        let wall;

        if (level[i][j] == MAP_LEGEND.STEEL_WALL) {
          wall = new SteelWall(positionTop, positionLeft, store);
        }
        if (level[i][j] == MAP_LEGEND.BRICK_WALL) {
          wall = new BrickWall(positionTop, positionLeft, store);
        }

        store.dispatch(add_wall(wall));
        wall.draw();
      }
    }
  }
}
