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
  const $element = document.createElement("div");
  $element.className = "game_object";
  $element.style.top = object.borderTop + "px";
  $element.style.left = object.borderLeft + "px";

  animateBoom($element, 1);

  function animateBoom(element, image) {
    if (image < 6) {
      element.className = "game_object boom_Image_" + image;
      image = image + 1;
      setTimeout(() => animateBoom(element, image), 67);
    } else {
      element.remove();
    }
  }

  object.gameField.appendChild($element);
}

export function appearAnimation(object) {
  const $element = document.createElement("div");
  $element.className = "game_object";
  $element.style.top = object.borderTop + "px";
  $element.style.left = object.borderLeft + "px";

  animateBoom($element, 1);

  function animateBoom(element, image) {
    if (image < 5) {
      element.className = "game_object appear_" + image;
      image = image + 1;
      setTimeout(() => animateBoom(element, image), 100);
    } else {
      element.remove();
    }
  }

  object.gameField.appendChild($element);
}

export function activateGameOverScreen() {
  document.getElementById("gameOverText").innerText = "You Win";
  if (document.getElementById("butt").classList.contains("hidden")) {
    document.getElementById("butt").classList.remove("hidden");
  }
}

export function activateLooserScreen() {
  document.getElementById("gameOverText").innerText = "You Lose";
}

export function unlockRestartButton() {
  if (document.getElementById("butt").classList.contains("hidden")) {
    document.querySelgetElementByIdector("butt").classList.remove("hidden");
  }
}

export function lockRestartButton() {
  if (!document.querySelector("#butt").classList.contains("hidden")) {
    document.querySelector("#butt").classList.add("hidden");
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
