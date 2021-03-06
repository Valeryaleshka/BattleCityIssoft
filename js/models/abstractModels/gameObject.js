import { BLOCK_SIZE } from "../../settings/gameSettings.js";

export class GameObject {
  constructor(positionTop, positionLeft, store) {
    this.borderTop = positionTop;
    this.borderLeft = positionLeft;
    this.borderBottom = this.borderTop + BLOCK_SIZE;
    this.borderRight = this.borderLeft + BLOCK_SIZE;
    this.gameField = document.getElementById("gamefield");
    this.className = "game_object";
    this.$element = this.createElement();
    this.isDrawn = false;
    this.type = "object";
    this.store = store;
  }

  createElement() {
    const $element = document.createElement("div");
    $element.className = this.className;
    $element.style.top = this.borderTop + "px";
    $element.style.left = this.borderLeft + "px";

    return $element;
  }

  moveObject(increasePositionX, increasePositionY) {
    this.borderTop = this.borderTop + increasePositionY;
    this.borderBottom = this.borderBottom + increasePositionY;
    this.borderLeft = this.borderLeft + increasePositionX;
    this.borderRight = this.borderRight + increasePositionX;
    this._moveElement();
  }

  _moveElement() {
    this.$element.style.top = this.borderTop + "px";
    this.$element.style.left = this.borderLeft + "px";
  }

  draw() {
    this.isDrawn = true;
    this.gameField.appendChild(this.$element);
  }

  deleteObject() {
    this.isDrawn = false;
    this.$element.remove();
  }
}
