import { UP, DOWN, RIGHT, LEFT, PLAYER_TANK } from "./types/modelTypes.js";
import { GameObject } from "./abstractModels/gameObject.js";
import { BULLET_SIZE, BULLET_SPEED, GAMEFIELD_SIZE, REVERSE } from "./../settings/gameSettings.js";
import { borderExplosionSound } from "./../audio/audio.js";

export class Bullet extends GameObject {
  constructor(positionTop, positionLeft, store, tank) {
    super(positionTop, positionLeft, store);
    this.borderBottom = this.borderTop + BULLET_SIZE;
    this.borderRight = this.borderLeft + BULLET_SIZE;
    this.turrelDirection = tank.turrelDirection;
    this.className = "bullet";
    this.type = "bullet";
    this.$element = this.createElement(positionTop, positionLeft);
    this.tank = tank;
    this.draw();
  }

  createElement() {
    const $element = document.createElement("div");
    $element.className = this.className;
    $element.style.top = this.borderTop + "px";
    $element.style.left = this.borderLeft + "px";

    return $element;
  }

  move() {
    if (this._checkBulletBorederColision()) {
      switch (this.turrelDirection) {
        case UP:
          this.moveObject(0, BULLET_SPEED * REVERSE);
          break;
        case DOWN:
          this.moveObject(0, BULLET_SPEED);
          break;
        case LEFT:
          this.moveObject(BULLET_SPEED * REVERSE, 0);
          break;
        case RIGHT:
          this.moveObject(BULLET_SPEED, 0);
          break;
      }
    } else {
      if (this.tank.type === PLAYER_TANK) {
        borderExplosionSound();
      }
      this.deleteObject();
    }
  }

  _checkBulletBorederColision() {
    switch (this.turrelDirection) {
      case UP:
        return this.borderTop > 0;
      case DOWN:
        return this.borderBottom < GAMEFIELD_SIZE;
      case LEFT:
        return this.borderLeft > 0;
      case RIGHT:
        return this.borderRight < GAMEFIELD_SIZE;
    }
  }
}
