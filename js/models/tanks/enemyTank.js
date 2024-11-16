import { Tank } from "../abstractModels/tank.js";
import { ENEMY_TANK } from "../types/modelTypes.js";

export class EnemyTank extends Tank {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + "enemy";
    this.type = ENEMY_TANK;
    this.$element = this.createElement();
  }
}
