import { add_wall } from "./../redux/actionCreater.js";
import { BrickWall } from "./../models/brickWall.js";
import { MAP_LEGEND } from "./../models/map.js";
import { BLOCK_SIZE } from "./../settings/gameSettings.js";
import { PlayerTank } from "./../models/playerTank.js";
import { initAI } from "./../functions/ai.js";
import { startSound } from "./../audio/audio.js";

export const tanks = [];

export function levelInit(store, level) {
  initAI(store);
  const playertank = new PlayerTank(576, 192, store);
  playertank.draw();

  for (let i = 0; i < level.length; i++) {
    const positionTop = i * BLOCK_SIZE;
    for (let j = 0; j < level[i].length; j++) {
      const positionLeft = j * BLOCK_SIZE;
      if (level[i][j] == MAP_LEGEND.WALL) {
        const temp = new BrickWall(positionTop, positionLeft, store);
        store.dispatch(add_wall(temp));
        temp.draw();
      }
    }
  }

  startSound();
}
