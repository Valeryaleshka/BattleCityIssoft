import { PLAYER_TANK, STEEL_WALL } from "../types/modelTypes.js";
import { Wall } from "../abstractModels/wall.js";
import { borderExplosionSound } from "../../audio/audio.js";

export class SteelWall extends Wall {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + " steelWall";
    this.type = STEEL_WALL;
    this.$element = this.createElement();
  }

  deleteObject(bullet) {
    if (bullet.tank.type === PLAYER_TANK) {
      borderExplosionSound();
    }
  }
}
