import { Tank } from "/js/models/tank.js";
import { deleteTank } from "/js/redux/actionCreater.js";
import { ENEMY_TANK } from "/js/models/modelTypes.js";

export class EnemyTank extends Tank {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + "enemy";
    this.$element = this.createElement();
    this.type = ENEMY_TANK;
  }

  deleteElement = () => {
    this.$element.remove();
    this.$element = null;
    this.store.dispatch(deleteTank(this));
  };
}
