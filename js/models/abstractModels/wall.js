import { deleteWall } from "../../redux/actionCreater.js";
import { GameObject } from "./gameObject.js";

export class Wall extends GameObject {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
  }

  deleteObject() {
    super.deleteObject();
    this.store.dispatch(deleteWall(this));
  }
}
