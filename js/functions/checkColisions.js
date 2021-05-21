import { boomSound, wallExplosionSound } from "./../audio/audio.js";
import { BrickWall } from "./../models/brickWall.js";
import { Tank } from "./../models/tank.js";
import { PLAYER_TANK } from "./../models/modelTypes.js";
import { gameOver } from "./../redux/actionCreater.js";
import { PLAYER_1_TOP_POSITION, PLAYER_1_LEFT_POSITION } from "./../settings/gameSettings.js";

export function checkColisions(bullet, arrayObject, store) {
  const objectWithCollisions = [];

  arrayObject.forEach((gameObject) => {
    if (bullet.$element && gameObject.$element) {
      if (
        bullet.borderLeft < gameObject.borderRight &&
        bullet.borderRight > gameObject.borderLeft &&
        bullet.borderTop < gameObject.borderBottom &&
        bullet.borderBottom > gameObject.borderTop
      ) {
        objectWithCollisions.push(gameObject);
      }
    }
  });

  if (objectWithCollisions.length > 0) {
    bullet.deleteElement();

    objectWithCollisions.forEach((gameObject) => {
      gameObject.deleteElement();

      if (gameObject.type === PLAYER_TANK && gameObject.store.getState().playerLives > 0) {
        gameObject.newLive(PLAYER_1_TOP_POSITION, PLAYER_1_LEFT_POSITION);
      }

      if (gameObject.type === PLAYER_TANK && gameObject.store.getState().playerLives === 0) {
        document.getElementById("gameOverText").innerText = "You Lose";
        store.dispatch(gameOver());
      }

      if (gameObject instanceof Tank) {
        boomSound();
      }

      if (gameObject instanceof BrickWall && bullet.tank.type === PLAYER_TANK) {
        wallExplosionSound();
      }
    });
  }
}
