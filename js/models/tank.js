import { UP, DOWN, RIGHT, LEFT, PLAYER_TANK } from "./modelTypes.js";
import { GameObject } from "./gameObject.js";
import { Bullet } from "./bullet.js";
import { BLOCK_SIZE, BULLET_SIZE, GAMEFIELD_SIZE, TANK_SPEED } from "./../settings/gameSettings.js";
import { checkColisions } from "./../functions/checkColisions.js";
import { shotSound } from "./../audio/audio.js";
import { deleteTank } from "../redux/actionCreater.js";
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
    if (this.isDrawn) {
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
          this.store,
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
    if (this.bullet.isDrawn) {
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
      this._noCollisionWithObjects(this.store.getState().walls) &&
      this._noCollisionWithObjects(this.store.getState().tanks)
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
        return this.borderTop - TANK_SPEED >= 0;
      case DOWN:
        return this.borderBottom + TANK_SPEED <= GAMEFIELD_SIZE;
      case LEFT:
        return this.borderLeft - TANK_SPEED >= 0;
      case RIGHT:
        return this.borderRight + TANK_SPEED <= GAMEFIELD_SIZE;
    }
  };

  _changeTurrelDirection = (direction) => {
    let degreese = 0;

    this.turrelDirection = direction;

    switch (this.turrelDirection) {
      case UP:
        degreese = 0;
        break;
      case DOWN:
        degreese = 180;
        break;
      case LEFT:
        degreese = 270;
        break;
      case RIGHT:
        degreese = 90;
        break;
    }
    this.$element.style.transform = "rotate(" + degreese + "deg)";
  };

  _noCollisionWithObjects = (objects) => {
    const nearObjects = objects.filter((object) => _isNearObjects(object, this));
    const nearBurrelDirectionObjects = nearObjects.map((object) =>
      _willObjectsCollision(object, this, this.turrelDirection)
    );
    return nearBurrelDirectionObjects.every((object) => object == false);

    function _isNearObjects(object, tank) {
      if (
        object.borderTop < tank.borderBottom + TANK_SPEED &&
        object.borderBottom > tank.borderTop - TANK_SPEED &&
        object.borderLeft < tank.borderRight + TANK_SPEED &&
        object.borderRight > tank.borderLeft - TANK_SPEED
      ) {
        return true;
      }
      return false;
    }

    function _willObjectsCollision(objects, tank, turrel) {
      let result = false;
      switch (turrel) {
        case UP:
          if (
            tank.borderTop === objects.borderBottom &&
            tank.borderLeft < objects.borderRight &&
            tank.borderRight > objects.borderLeft
          ) {
            result = true;
          }
          break;
        case DOWN:
          if (
            tank.borderBottom === objects.borderTop &&
            tank.borderLeft < objects.borderRight &&
            tank.borderRight > objects.borderLeft
          ) {
            result = true;
          }
          break;
        case LEFT:
          if (
            tank.borderLeft === objects.borderRight &&
            tank.borderTop < objects.borderBottom &&
            tank.borderBottom > objects.borderTop
          ) {
            result = true;
          }
          break;
        case RIGHT:
          if (
            tank.borderRight === objects.borderLeft &&
            tank.borderTop < objects.borderBottom &&
            tank.borderBottom > objects.borderTop
          ) {
            result = true;
          }
          break;
      }
      return result;
    }
  };

  deleteElement = () => {
    this.isDrawn = false;
    this.$element.remove();
    this.store.dispatch(deleteTank(this));
  };
}
