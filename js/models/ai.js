import { EnemyTank } from "./enemyTank.js";
import { tanks } from "./levelInit.js";

let count = 0;
const position = [0, 288, 576];

export function initAI() {
  _createAI(0, position[count % 3]);
  count++;
}

function _createAI(positionTop, positionLeft) {
  const enemy = new EnemyTank(positionTop, positionLeft);
  tanks.push(enemy);
  enemy.$element.style.transform = "rotate(180deg)";
  enemy.draw();
  let randomNumberDistance = 1;

  function timeout() {
    setTimeout(function () {
      if (enemy.$element) {
        randomNumberDistance = Math.floor(Math.random() * 3) + 1;
        _aiAction(enemy, randomNumberDistance);
        timeout();
      }
    }, randomNumberDistance * 500);
  }
  timeout();
}

function _aiAction(enemy, randomNumberDistance) {
  const randomNumberDirection = Math.floor(Math.random() * 4);

  _aiMove(enemy, randomNumberDirection, 0, randomNumberDistance);
  enemy.shot();
}

function _aiMove(enemy, randomNumber, numberOfIteration, randomNumberDistance) {
  if (numberOfIteration < 24 * randomNumberDistance && enemy.$element) {
    numberOfIteration++;
    switch (randomNumber) {
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
    requestAnimationFrame(() =>
      _aiMove(enemy, randomNumber, numberOfIteration, randomNumberDistance)
    );
  }
}
