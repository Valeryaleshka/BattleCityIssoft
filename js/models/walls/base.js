import { PLAYER_BASE } from "../types/modelTypes.js";
import { deleteWall } from "../../redux/actionCreater.js";
import { GameObject } from "../abstractModels/gameObject.js";

export class PlayerBase extends GameObject {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + " playerBase";
    this.type = PLAYER_BASE;
    this.$element = this.createElement();
  }

  deleteElement = () => {
    this.$element.remove();
    this.isDrawn = false;
    this.store.dispatch(deleteWall(this));
  };
}
