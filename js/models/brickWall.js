import { BRICK_WALL } from "/js/models/modelTypes.js";
import { deleteWall } from "/js/redux/actionCreater.js";
import { GameObject } from "/js/models/gameObject.js";

export class BrickWall extends GameObject {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + " brickWall";
    this.type = BRICK_WALL;
    this.$element = this.createElement();
  }

  deleteElement = () => {
    this.$element.remove();
    this.$element = null;
    this.store.dispatch(deleteWall(this));
  };
}
