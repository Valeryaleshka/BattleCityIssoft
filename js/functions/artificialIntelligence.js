import { add_tank, decrementEnemyTank } from "../redux/actionCreater.js";
import { EnemyTank } from "../models/enemyTank.js";
import { ENEMY_TANK } from "../models/modelTypes.js";
import {
  ENEMY_TOP_POSITION,
  ENEMY_CENTER_POSITION,
  ENEMY_LEFT_POSITION,
  ENEMY_RIGHT_POSITION,
  MAXIMUM_ENEMIES_ON_GAMEFIELD,
  NUMBER_OF_ENEMY_STEPS_PER_MOVE,
  TIME_FOR_1_STEP,
} from "../settings/gameSettings.js";

let currentIndexOfEnemiesPositions = 0;
const enemiesPositions = [ENEMY_LEFT_POSITION, ENEMY_CENTER_POSITION, ENEMY_RIGHT_POSITION];

export function initiateAI(store) {
  const ai = setInterval(() => {
    if (store.getState().IS_GAME_OVER) {
      clearInterval(ai);
    }

    if (store.getState().tanks) {
      const enemiesTanks = store.getState().tanks.filter((tank) => tank.type == ENEMY_TANK);
      const enemiesLives = store.getState().enemiesCount;
      if (enemiesTanks.length < MAXIMUM_ENEMIES_ON_GAMEFIELD && enemiesLives > 0) {
        _createAI(ENEMY_TOP_POSITION, enemiesPositions[currentIndexOfEnemiesPositions % 3], store);
        store.dispatch(decrementEnemyTank());
        currentIndexOfEnemiesPositions++;
      }
    }
  }, 1000);
}

function _createAI(positionTop, positionLeft, store) {
  const enemy = new EnemyTank(positionTop, positionLeft, store);
  let randomNumberDistanceMove = 1;

  store.dispatch(add_tank(enemy));
  enemy.draw();

  function timeout() {
    setTimeout(function () {
      if (enemy.isDrawn && !store.getState().IS_GAME_OVER) {
        randomNumberDistanceMove = Math.floor(Math.random() * 3) + 1;
        _aiAction(enemy, randomNumberDistanceMove);
        timeout();
      }
    }, randomNumberDistanceMove * TIME_FOR_1_STEP);
  }
  timeout();
}

function _aiAction(enemy, randomNumberDistanceMove) {
  const randomNumberDirection = Math.floor(Math.random() * 4);

  _aiMove(enemy, randomNumberDirection, 0, randomNumberDistanceMove);
  enemy.shot();
}

function _aiMove(enemy, randomNumber, numberOfSpets, randomNumberDistanceMove) {
  if (numberOfSpets < NUMBER_OF_ENEMY_STEPS_PER_MOVE * randomNumberDistanceMove && enemy.isDrawn) {
    numberOfSpets++;
    switch (randomNumberDistanceMove) {
      case 0:
        enemy.moveUp();
        break;
      case 1:
        enemy.moveDown();
        break;
      case 2:
        enemy.moveLeft();
        break;
      case 3:
        enemy.moveRight();
        break;
    }
    requestAnimationFrame(() => _aiMove(enemy, randomNumber, numberOfSpets, randomNumberDistanceMove));
  }
}
