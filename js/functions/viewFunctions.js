const button = document.getElementById("restartButton");

function _createElement(object) {
  const $element = document.createElement("div");
  $element.className = "game_object";
  $element.style.top = object.borderTop + "px";
  $element.style.left = object.borderLeft + "px";

  return $element;
}

export function toggleStartScreen() {
  const main = document.getElementById("main");
  main.classList.remove("hidden");
  const gameOver = document.getElementById("startGameScreen");
  gameOver.classList.add("hidden");
}

export function toggleGameOverScreen() {
  const main = document.getElementById("main");
  main.classList.toggle("hidden");
  const gameOver = document.getElementById("gameOverScreen");
  gameOver.classList.toggle("hidden");
}

export function boomAnimation(object) {
  const $element = _createElement(object);
  _animateBoom($element, 1);

  function _animateBoom(element, image) {
    if (image < 6) {
      element.className = "game_object boom_Image_" + image;
      image = image + 1;
      setTimeout(() => _animateBoom(element, image), 67);
    } else {
      element.remove();
    }
  }

  object.gameField.appendChild($element);
}

export function appearAnimation(object) {
  const $element = _createElement(object);
  _animateAppear($element, 1);

  function _animateAppear(element, image) {
    if (image < 5) {
      element.className = "game_object appear_" + image;
      image = image + 1;
      setTimeout(() => _animateAppear(element, image), 100);
    } else {
      element.remove();
    }
  }

  object.gameField.appendChild($element);
}

export function activateGameOverScreen() {
  document.getElementById("gameOverText").innerText = "You Win";
  if (button.classList.contains("hidden")) {
    button.classList.remove("hidden");
  }
}

export function activateLooserScreen() {
  document.getElementById("gameOverText").innerText = "You Lose";
}

export function unlockRestartButton() {
  if (button.classList.contains("hidden")) {
    button.classList.remove("hidden");
  }
}

export function lockRestartButton() {
  if (!button.classList.contains("hidden")) {
    button.classList.add("hidden");
  }
}

export function animateDistroyedBase(gameObject) {
  gameObject.$element.className = "game_object playerBaseDestroyed";
}

export function activateNextLevelScreen() {
  document.getElementById("gameOverText").innerText = "Welcome to Next Level";
  lockRestartButton();
}

export function clearGameField() {
  document.querySelector("#gamefield").innerHTML = "";
}
