import { Tank } from "./tank.js";
import { ENEMY_TANK } from "./modelTypes.js";

export class EnemyTank extends Tank {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + "enemy";
    this.$element = this.createElement();
    this.type = ENEMY_TANK;
  }
}
