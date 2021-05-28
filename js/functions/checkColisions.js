import { boomSound, borderExplosionSound, wallExplosionSound } from "./../audio/audio.js";
import { BrickWall } from "./../models/brickWall.js";
import { Tank } from "./../models/tank.js";
import { PLAYER_TANK } from "./../models/modelTypes.js";
import { gameOver } from "./../redux/actionCreater.js";
import { PLAYER_1_TOP_POSITION, PLAYER_1_LEFT_POSITION } from "./../settings/gameSettings.js";
import { activateLooserScreen } from "./viewFunctions.js";
import { SteelWall } from "../models/steelWall.js";

export function checkColisions(bullet, arrayOfObjects, store) {
  const objectWithCollisions = [];

  arrayOfObjects.forEach((gameObject) => {
    if (bullet.isDrawn && gameObject.isDrawn) {
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
      if (gameObject instanceof SteelWall) {
        if (bullet.tank.type === PLAYER_TANK) {
          borderExplosionSound();
        }
      } else {
        gameObject.deleteElement();

        if (gameObject instanceof Tank) {
          boomSound();

          if (gameObject.type === PLAYER_TANK) {
            if (gameObject.store.getState().playerLives > 0) {
              gameObject.newLive(PLAYER_1_TOP_POSITION, PLAYER_1_LEFT_POSITION);
            }
            if (gameObject.store.getState().playerLives === 0) {
              activateLooserScreen();
              store.dispatch(gameOver());
            }
          }
        }

        if (gameObject instanceof BrickWall && bullet.tank.type === PLAYER_TANK) {
          wallExplosionSound();
        }
      }
    });
  }
}
