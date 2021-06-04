import { BRICK_WALL, PLAYER_TANK } from "./../types/modelTypes.js";
import { Wall } from "../abstractModels/wall.js";
import { wallExplosionSound } from "../../audio/audio.js";

export class BrickWall extends Wall {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + " brickWall";
    this.type = BRICK_WALL;
    this.$element = this.createElement();
  }

  deleteObject(bullet) {
    super.deleteObject();
    if (bullet.tank.type === PLAYER_TANK) {
      wallExplosionSound();
    }
  }
}
