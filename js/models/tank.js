import { UP, DOWN, RIGHT, LEFT } from "./directions.js";
import { GameObject } from "./gameObject.js";
import { TANK_SPEED } from "./settings.js";

export class Tank extends GameObject {
  constructor(positionTop, positionLeft) {
    super(positionTop, positionLeft);
    this.className = this.className + " tank_";
    this.type = "tank";
    this.turrelDirection = UP;
    this.element = this.createElement();
  }

  moveUp = () => {
    this._changeTurrelDirection(UP);
    this._move();
  };

  moveDown = () => {
    this._changeTurrelDirection(DOWN);
    this._move();
  };

  moveLeft = () => {
    this._changeTurrelDirection(LEFT);
    this._move();
  };

  moveRight = () => {
    this._changeTurrelDirection(RIGHT);
    this._move();
  };

  shot = () => {};

  _move = () => {
    if (this._checkBorder()) {
      switch (this.turrelDirection) {
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
    }
  };

  _checkBorder = () => {
    switch (this.turrelDirection) {
      case UP:        
        return this.element.offsetTop - TANK_SPEED >= this.gameField.offsetTop;
      case DOWN:
        return (
          this.element.offsetTop + this.element.offsetHeight + TANK_SPEED <=
          this.gameField.offsetHeight
        );
      case LEFT:
        return (
          this.element.offsetLeft - TANK_SPEED >= this.gameField.offsetLeft
        );
      case RIGHT:
        return (
          this.element.offsetLeft + this.element.offsetWidth + TANK_SPEED <=
          this.gameField.offsetWidth
        );
    }
  };

  _changeTurrelDirection = (direction) => {
    this.turrelDirection = direction;
    switch (this.turrelDirection) {
      case UP:
        this.element.style.transform = "rotate(0deg)";
        break;
      case DOWN:
        this.element.style.transform = "rotate(180deg)";
        break;
      case LEFT:
        this.element.style.transform = "rotate(270deg)";
        break;
      case RIGHT:
        this.element.style.transform = "rotate(90deg)";
        break;
    }
  };
}
