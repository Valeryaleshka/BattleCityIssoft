import { UP, DOWN, RIGHT, LEFT } from "./directions.js";
import { GameObject } from "./gameObject.js";
import { TANK_SPEED } from "./settings.js";
import { Bullet } from "./bullet.js";
import { map, tanks } from "./levelInit.js";
import { checkColisions } from "./checkColisions.js";

export class Tank extends GameObject {
  constructor(positionTop, positionLeft) {
    super(positionTop, positionLeft);
    this.className = this.className + " tank_";
    this.type = "tank";
    this.turrelDirection = UP;
    this.$element = this.createElement();
    this.isShoted = false;
    this.bullet = null;
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

  shot = () => {
    
    let walls;
    if (!this.isShoted) {
      this.isShoted = true;
      this.bullet = new Bullet(
        this.positionTop + 21,
        this.positionLeft + 21,
        this
      );

      const bulletElement = this.bullet.$element;

      switch (this.turrelDirection) {
        case UP:
          walls = map.filter(
            (elem) =>
              elem.$element.offsetLeft + elem.$element.offsetWidth >=
                bulletElement.offsetLeft +
                  bulletElement.offsetWidth &&
              elem.$element.offsetLeft <= bulletElement.offsetLeft &&
              elem.$element.offsetTop + elem.$element.offsetHeight <=
                bulletElement.offsetTop
          );
          
          break;
        case DOWN:
          walls = map
            .filter(
              (elem) =>
                elem.$element.offsetLeft + elem.$element.offsetWidth >=
                  bulletElement.offsetLeft +
                    bulletElement.offsetWidth &&
                elem.$element.offsetLeft <= bulletElement.offsetLeft &&
                elem.$element.offsetTop + elem.$element.offsetHeight >=
                  bulletElement.offsetTop +
                    bulletElement.offsetHeight
            )
            .reverse();
           
          break;
        case LEFT:
          walls = map.filter(
            (elem) =>
              elem.$element.offsetTop + elem.$element.offsetHeight >=
                bulletElement.offsetTop +
                  bulletElement.offsetHeight &&
              elem.$element.offsetTop <= bulletElement.offsetTop &&
              elem.$element.offsetLeft + elem.$element.offsetWidth <=
                bulletElement.offsetLeft
          );
         
          break;
        case RIGHT:
          walls = map
            .filter(
              (elem) =>
                elem.$element.offsetTop + elem.$element.offsetHeight >=
                  bulletElement.offsetTop +
                    bulletElement.offsetHeight &&
                elem.$element.offsetTop <= bulletElement.offsetTop &&
                elem.$element.offsetLeft >=
                  bulletElement.offsetLeft +
                    bulletElement.offsetWidth
            )
            .reverse();
            
          break;
      }           
      this._poof(walls);
    }
  };

  _poof = (walls) => {
    const enemyTanks = tanks.filter(tank => tank.type != this.type)     
    if (this.bullet.$element) {
      this.bullet.move();
      checkColisions(this.bullet, walls); 
      requestAnimationFrame(() => this._poof(walls));
    } else {
      this.bullet = null;
      this.isShoted = false;
    }
  };

  _move = () => {

    const element = this.$element;

    if (this._checkTankBorderColision()) {
      switch (this.turrelDirection) {
        case UP:  
          element.style.top = element.offsetTop - TANK_SPEED + "px";
          this.positionTop = element.offsetTop;
          break;
        case DOWN:
          element.style.top = element.offsetTop + TANK_SPEED + "px";
          this.positionTop = element.offsetTop;
          break;
        case LEFT:
          element.style.left =
            element.offsetLeft - TANK_SPEED + "px";
          this.positionLeft = element.offsetLeft;
          break;
        case RIGHT:
          element.style.left =
            element.offsetLeft + TANK_SPEED + "px";
          this.positionLeft = element.offsetLeft;
          break;
      }
    }
  };

  _checkTankBorderColision = () => {

    const element = this.$element;

    switch (this.turrelDirection) {
      case UP:
        return element.offsetTop - TANK_SPEED >= this.gameField.offsetTop;
      case DOWN:
        return (
          element.offsetTop + element.offsetHeight + TANK_SPEED <=
          this.gameField.offsetHeight
        );
      case LEFT:
        return (
          element.offsetLeft - TANK_SPEED >= this.gameField.offsetLeft
        );
      case RIGHT:
        return (
          element.offsetLeft + element.offsetWidth + TANK_SPEED <=
          this.gameField.offsetWidth
        );
    }
  };

  _changeTurrelDirection = (direction) => {

    const element = this.$element;

    this.turrelDirection = direction;
    switch (this.turrelDirection) {
      case UP:
        element.style.transform = "rotate(0deg)";
        break;
      case DOWN:
        element.style.transform = "rotate(180deg)";
        break;
      case LEFT:
        element.style.transform = "rotate(270deg)";
        break;
      case RIGHT:
        element.style.transform = "rotate(90deg)";
        break;
    }
  };
}
