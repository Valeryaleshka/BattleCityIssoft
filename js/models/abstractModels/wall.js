import { STEEL_WALL } from "../types/modelTypes.js";
import { deleteWall } from "../../redux/actionCreater.js";
import { GameObject } from "./gameObject";

export class SteelWall extends GameObject {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + " steelWall";
    this.type = STEEL_WALL;
    this.$element = this.createElement();
  }

  deleteElement = () => {
    this.$element.remove();
    this.isDrawn = false;
    this.store.dispatch(deleteWall(this));
  };
}
