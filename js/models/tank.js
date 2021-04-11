import { UP, DOWN, RIGHT, LEFT } from "./directions.js";
import { GameObject } from "./gameObject.js";
import { TANK_SPEED } from "./settings.js";
import { Bullet } from "./bullet.js";
import { map, tanks } from "./levelInit.js";
import { checkColisions, checkColisionsWithTank } from "./checkColisions.js";

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
    if (this.$element) {
      this._changeTurrelDirection(UP);
      this._move();
    } else {
      if ((this.type = "playerTank")) {
        this.newLive(576, 288);
      }
    }
  };

  moveDown = () => {
    if (this.$element) {
      this._changeTurrelDirection(DOWN);
      this._move();
    } else {
      if ((this.type = "playerTank")) {
        this.newLive(576, 288);
      }
    }
  };

  moveLeft = () => {
    if (this.$element) {
      this._changeTurrelDirection(LEFT);
      this._move();
    } else {
      if ((this.type = "playerTank")) {
        this.newLive(576, 288);
      }
    }
  };

  moveRight = () => {
    if (this.$element) {
      this._changeTurrelDirection(RIGHT);
      this._move();
    } else {
      if ((this.type = "playerTank")) {
        this.newLive(576, 288);
      }
    }
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
                bulletElement.offsetLeft + bulletElement.offsetWidth &&
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
                  bulletElement.offsetLeft + bulletElement.offsetWidth &&
                elem.$element.offsetLeft <= bulletElement.offsetLeft &&
                elem.$element.offsetTop + elem.$element.offsetHeight >=
                  bulletElement.offsetTop + bulletElement.offsetHeight
            )
            .reverse();

          break;
        case LEFT:
          walls = map.filter(
            (elem) =>
              elem.$element.offsetTop + elem.$element.offsetHeight >=
                bulletElement.offsetTop + bulletElement.offsetHeight &&
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
                  bulletElement.offsetTop + bulletElement.offsetHeight &&
                elem.$element.offsetTop <= bulletElement.offsetTop &&
                elem.$element.offsetLeft >=
                  bulletElement.offsetLeft + bulletElement.offsetWidth
            )
            .reverse();

          break;
      }
      const enemies = tanks.filter((elem) => elem.type != this.type);
      this._poof(walls, enemies);
    }
  };

  _poof = (walls, enemies) => {
    const enemyTanks = tanks.filter((tank) => tank.type != this.type);
    if (this.bullet.$element) {
      this.bullet.move();
      checkColisionsWithTank(this.bullet, enemies);
      checkColisions(this.bullet, walls);
      requestAnimationFrame(() => this._poof(walls, enemies));
    } else {
      this.bullet = null;
      this.isShoted = false;
    }
  };

  _move = () => {
    const element = this.$element;    
    if (this._checkTankNotOutOfBorder() && this._noWallCollision(map) && this._noWallCollision(tanks)) {
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
          element.style.left = element.offsetLeft - TANK_SPEED + "px";
          this.positionLeft = element.offsetLeft;
          break;
        case RIGHT:
          element.style.left = element.offsetLeft + TANK_SPEED + "px";
          this.positionLeft = element.offsetLeft;
          break;
      }
    }
  };

  _checkTankNotOutOfBorder = () => {
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
        return element.offsetLeft - TANK_SPEED >= this.gameField.offsetLeft;
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

  _noWallCollision = (walls) => {
    const nearWalls = walls.filter((wall) => _isNearWall(wall, this));
    const newWall = nearWalls.map((elem) =>
      isWall(elem, this, this.turrelDirection)
    );

    return newWall.every(isBigEnough);

    function isBigEnough(element, index, array) {
      return element == false;
    }

    function _isNearWall(wall, tank) {
      if (
        wall.$element.offsetTop <
          tank.$element.offsetTop + tank.$element.offsetHeight * 2 &&
        wall.$element.offsetTop >
          tank.$element.offsetTop - tank.$element.offsetHeight * 2 &&
        wall.$element.offsetLeft >
          tank.$element.offsetLeft - tank.$element.offsetWidth * 2 &&
        wall.$element.offsetLeft <
          tank.$element.offsetLeft + tank.$element.offsetWidth * 2
      ) {
        return true;
      }
      return false;
    }

    function isWall(elem, tank, turrel) {
      let result = false;
      switch (turrel) {
        case UP:
          if (
            tank.$element.offsetTop ===
              elem.$element.offsetTop + elem.$element.offsetHeight &&
            tank.$element.offsetLeft <
              elem.$element.offsetLeft + elem.$element.offsetWidth &&
            tank.$element.offsetLeft + tank.$element.offsetWidth >
              elem.$element.offsetLeft
          ) {
            result = true;
          }
          break;
        case DOWN:
          if (
            tank.$element.offsetTop ===
              elem.$element.offsetTop - elem.$element.offsetWidth &&
            tank.$element.offsetLeft <
              elem.$element.offsetLeft + elem.$element.offsetWidth &&
            tank.$element.offsetLeft + tank.$element.offsetWidth >
              elem.$element.offsetLeft
          ) {
            result = true;
          }
          break;
        case LEFT:
          if (
            tank.$element.offsetLeft ===
              elem.$element.offsetLeft + elem.$element.offsetHeight &&
            tank.$element.offsetTop <
              elem.$element.offsetTop + elem.$element.offsetHeight &&
            tank.$element.offsetTop + tank.$element.offsetHeight >
              elem.$element.offsetTop
          ) {
            result = true;
          }
          break;
        case RIGHT:
          if (
            tank.$element.offsetLeft ===
              elem.$element.offsetLeft - elem.$element.offsetHeight &&
            tank.$element.offsetTop <
              elem.$element.offsetTop + elem.$element.offsetHeight &&
            tank.$element.offsetTop + tank.$element.offsetHeight >
              elem.$element.offsetTop
          ) {
            result = true;
          }
          break;
      }

      return result;
    }
  };
}
