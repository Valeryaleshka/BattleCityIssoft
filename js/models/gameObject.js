import { BLOCK_SIZE, BULLET_SIZE } from "/js/settings/gameSettings.js";

export class GameObject {
  constructor(positionTop, positionLeft, store) {
    this.borderTop = positionTop;
    this.borderLeft = positionLeft;
    this.borderBottom;
    this.borderRight;
    this.gameField = document.getElementById("gamefield");
    this.className = "game_object";
    this.$element;
    this.type = "object";
    this.store = store;
  }

  addElementToField = () => {
    this.gameField.appendChild(this.$element);
  };

  createElement = () => {
    const $element = document.createElement("div");
    $element.className = this.className;
    $element.style.top = this.borderTop + "px";
    $element.style.left = this.borderLeft + "px";
    if (this.type === "bullet") {
      this.borderBottom = this.borderTop + BULLET_SIZE;
      this.borderRight = this.borderLeft + BULLET_SIZE;
    } else {
      this.borderBottom = this.borderTop + BLOCK_SIZE;
      this.borderRight = this.borderLeft + BLOCK_SIZE;
    }

    return $element;
  };

  moveElement(positionX, positionY) {
    this.borderTop = this.borderTop + positionY;
    this.borderBottom = this.borderBottom + positionY;
    this.borderLeft = this.borderLeft + positionX;
    this.borderRight = this.borderRight + positionX;
    this.$element.style.top = this.borderTop + "px";
    this.$element.style.left = this.borderLeft + "px";
  }

  draw = () => {
    this.gameField.appendChild(this.$element);
  };

  deleteElement = () => {
    this.$element.remove();
    this.$element = null;
  };
}
