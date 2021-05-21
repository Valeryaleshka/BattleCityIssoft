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
