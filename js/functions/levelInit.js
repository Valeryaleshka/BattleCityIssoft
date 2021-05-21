import { add_wall } from "/js/redux/actionCreater.js";
import { BrickWall } from "/js/models/brickWall.js";
import { MAP_LEGEND } from "/js/models/map.js";
import { BLOCK_SIZE } from "/js/settings/gameSettings.js";
import { PlayerTank } from "/js/models/playerTank.js";
import { initAI } from "/js/functions/ai.js";
import { startSound } from "/js/audio/audio.js";

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
