import { UP, DOWN, RIGHT, LEFT, PLAYER_TANK } from "/js/models/modelTypes.js";
import { GameObject } from "/js/models/gameObject.js";
import { Bullet } from "/js/models/bullet.js";
import { BLOCK_SIZE, BULLET_SIZE, TANK_SPEED } from "/js/settings/gameSettings.js";
import { checkColisions } from "/js/functions/checkColisions.js";
import { deleteTank, restart } from "/js/redux/actionCreater.js";
import { borderExplosionSound, shotSound } from "/js/audio/audio.js";
export class Tank extends GameObject {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
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
    if (this.$element) {
      const storeWalls = this.store.getState().walls;
      let walls;
      if (!this.isShoted) {
        if (this.type === PLAYER_TANK) {
          shotSound();
        }

        this.isShoted = true;
        this.bullet = new Bullet(
          this.borderTop + BLOCK_SIZE / 2 - BULLET_SIZE / 2,
          this.borderLeft + BLOCK_SIZE / 2 - BULLET_SIZE / 2,
          this
        );

        switch (this.turrelDirection) {
          case UP:
            walls = storeWalls.filter(
              (elem) =>
                elem.borderRight > this.bullet.borderLeft &&
                elem.borderLeft < this.bullet.borderRight &&
                elem.borderBottom <= this.bullet.borderTop
            );
            break;
          case DOWN:
            walls = storeWalls
              .filter(
                (elem) =>
                  elem.borderRight > this.bullet.borderLeft &&
                  elem.borderLeft < this.bullet.borderRight &&
                  elem.borderTop >= this.bullet.borderBottom
              )
              .reverse();
            break;
          case LEFT:
            walls = storeWalls.filter(
              (elem) =>
                elem.borderBottom > this.bullet.borderTop &&
                elem.borderTop < this.bullet.borderBottom &&
                elem.borderRight <= this.bullet.borderLeft
            );
            break;
          case RIGHT:
            walls = storeWalls
              .filter(
                (elem) =>
                  elem.borderBottom > this.bullet.borderTop &&
                  elem.borderTop < this.bullet.borderBottom &&
                  elem.borderRight >= this.bullet.borderLeft
              )
              .reverse();
            break;
        }
        const enemies = this.store.getState().tanks.filter((elem) => elem.type != this.type);
        this._poof(walls, enemies);
      }
    }
  };

  _poof = (walls, enemies) => {
    if (this.bullet.$element) {
      this.bullet.move();
      checkColisions(this.bullet, enemies, this.store);
      checkColisions(this.bullet, walls, this.store);
      requestAnimationFrame(() => this._poof(walls, enemies));
    } else {
      this.bullet = null;
      this.isShoted = false;
    }
  };

  _move = () => {
    if (
      this._checkTankNotOutOfBorder() &&
      this._noWallCollision(this.store.getState().walls) &&
      this._noWallCollision(this.store.getState().tanks)
    ) {
      switch (this.turrelDirection) {
        case UP:
          this.moveElement(0, TANK_SPEED * -1);
          break;
        case DOWN:
          this.moveElement(0, TANK_SPEED);
          break;
        case LEFT:
          this.moveElement(TANK_SPEED * -1, 0);
          break;
        case RIGHT:
          this.moveElement(TANK_SPEED, 0);
          break;
      }
    }
  };

  _checkTankNotOutOfBorder = () => {
    switch (this.turrelDirection) {
      case UP:
        return this.borderTop - TANK_SPEED >= this.gameField.offsetTop;
      case DOWN:
        return this.borderBottom + TANK_SPEED <= this.gameField.offsetHeight;
      case LEFT:
        return this.borderLeft - TANK_SPEED >= this.gameField.offsetLeft;
      case RIGHT:
        return this.borderRight + TANK_SPEED <= this.gameField.offsetWidth;
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
    const newWall = nearWalls.map((elem) => isWall(elem, this, this.turrelDirection));

    return newWall.every(isBigEnough);

    function isBigEnough(element, index, array) {
      return element == false;
    }

    function _isNearWall(wall, tank) {
      if (
        wall.borderTop < tank.borderBottom + TANK_SPEED &&
        wall.borderBottom > tank.borderTop - TANK_SPEED &&
        wall.borderLeft < tank.borderRight + TANK_SPEED &&
        wall.borderRight > tank.borderLeft - TANK_SPEED
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
            tank.borderTop === elem.borderBottom &&
            tank.borderLeft < elem.borderRight &&
            tank.borderRight > elem.borderLeft
          ) {
            result = true;
          }
          break;
        case DOWN:
          if (
            tank.borderBottom === elem.borderTop &&
            tank.borderLeft < elem.borderRight &&
            tank.borderRight > elem.borderLeft
          ) {
            result = true;
          }
          break;
        case LEFT:
          if (
            tank.borderLeft === elem.borderRight &&
            tank.borderTop < elem.borderBottom &&
            tank.borderBottom > elem.borderTop
          ) {
            result = true;
          }
          break;
        case RIGHT:
          if (
            tank.borderRight === elem.borderLeft &&
            tank.borderTop < elem.borderBottom &&
            tank.borderBottom > elem.borderTop
          ) {
            result = true;
          }
          break;
      }
      return result;
    }
  };

  deleteElement = () => {
    this.$element.remove();
    this.$element = null;
    this.store.dispatch(deleteTank(this));
  };
}
