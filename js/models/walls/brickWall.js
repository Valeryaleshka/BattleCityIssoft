import { BRICK_WALL } from "./../types/modelTypes.js";
import { deleteWall } from "./../../redux/actionCreater.js";
import { GameObject } from "../abstractModels/gameObject.js";

export class BrickWall extends GameObject {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + " brickWall";
    this.type = BRICK_WALL;
    this.$element = this.createElement();
  }

  deleteElement = () => {
    this.$element.remove();
    this.isDrawn = false;
    this.store.dispatch(deleteWall(this));
  };
}