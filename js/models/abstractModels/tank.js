import { UP, DOWN, RIGHT, LEFT, PLAYER_TANK } from "../types/modelTypes.js";
import { GameObject } from "./gameObject.js";
import { Bullet } from "../bullet.js";
import { BLOCK_SIZE, BULLET_SIZE, GAMEFIELD_SIZE, REVERSE, TANK_SPEED } from "../../settings/gameSettings.js";
import { handleColisions } from "../../functions/handleColisions.js";
import { boomSound, shotSound } from "../../audio/audio.js";
import { add_tank, deleteTank } from "../../redux/actionCreater.js";
import { boomAnimation } from "../../functions/viewFunctions.js";
export class Tank extends GameObject {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + " tank_";
    this.type = "tank";
    this.turrelDirection = UP;
    this.isShoted = false;
    this.bullet = null;
    this.store.dispatch(add_tank(this));
  }

  DEBOUNCE_TIME = 500; 
  lastShotTime = 0;

  moveUp() {
    this._changeTurrelDirection(UP);
    this._move();
  }

  moveDown() {
    this._changeTurrelDirection(DOWN);
    this._move();
  }

  moveLeft() {
    this._changeTurrelDirection(LEFT);
    this._move();
  }

  moveRight() {
    this._changeTurrelDirection(RIGHT);
    this._move();
  }


  shot() {

    const currentTime = Date.now();
    

    if (this.isDrawn && currentTime - this.lastShotTime >= this.DEBOUNCE_TIME) {
      this.lastShotTime = currentTime;
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
        this._launchBullet(walls, enemies);
      }
    }
  }

  _launchBullet(walls, enemies) {
    if (this.bullet.isDrawn) {
      this.bullet.move();
      handleColisions(this.bullet, enemies, this.store);
      handleColisions(this.bullet, walls, this.store);
      requestAnimationFrame(() => this._launchBullet(walls, enemies));
    } else {
      this.bullet = null;
      this.isShoted = false;
    }
  }

  _move() {
    if (
      this._checkTankNotOutOfBorder() &&
      this._noCollisionWithObjects(this.store.getState().walls) &&
      this._noCollisionWithObjects(this.store.getState().tanks)
    ) {
      switch (this.turrelDirection) {
        case UP:
          this.moveObject(0, TANK_SPEED * REVERSE);
          break;
        case DOWN:
          this.moveObject(0, TANK_SPEED);
          break;
        case LEFT:
          this.moveObject(TANK_SPEED * REVERSE, 0);
          break;
        case RIGHT:
          this.moveObject(TANK_SPEED, 0);
          break;
      }
    }
  }

  _checkTankNotOutOfBorder() {
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
  }

  _changeTurrelDirection(direction) {
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
  }

  _noCollisionWithObjects(objects) {
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
  }

  deleteObject() {
    super.deleteObject();
    this.store.dispatch(deleteTank(this));
    boomAnimation(this);
    boomSound();
  }
}
