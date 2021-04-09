import { UP, DOWN, RIGHT, LEFT } from "./directions.js";
import { GameObject } from "./gameObject.js";
import { TANK_SPEED } from "./settings.js";

export class Tank extends GameObject {
  constructor(positionTop, positionLeft) {
    super(positionTop, positionLeft);
    this.className = this.className + " tank_";
    this.type = "tank";
    this.turretDirection = UP;
    this.element = this.createElement();
  }

  moveUp = () => {
    this.turretDirection = UP;
    this._move();
  };

  moveDown = () => {
    this.turretDirection = DOWN;
    this._move();
  };

  moveLeft = () => {
    this.turretDirection = LEFT;
    this._move();
  };

  moveRight = () => {
    this.turretDirection = RIGHT;
    this._move();
  };

  _move = () => {
    switch (this.turretDirection) {
      case UP:
        this.element.style.transform = "rotate(0deg)";
        this.element.style.top = this.element.offsetTop - TANK_SPEED + "px";
        this.element.positionTop = this.element.offsetTop;
        break;
      case DOWN:
        this.element.style.transform = "rotate(180deg)";
        this.element.style.top = this.element.offsetTop + TANK_SPEED + "px";
        this.element.positionTop = this.element.offsetTop;
        break;
      case LEFT:
        this.element.style.transform = "rotate(270deg)";
        this.element.style.left = this.element.offsetLeft - TANK_SPEED + "px";
        this.element.positionLeft = this.element.offsetLeft;
        break;
      case RIGHT:
        this.element.style.transform = "rotate(90deg)";
        this.element.style.left = this.element.offsetLeft + TANK_SPEED + "px";
        this.element.positionLeft = this.element.offsetLeft;
        break;
    }
  };

  shot = () => {};
}
