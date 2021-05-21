function _displayLives(store) {
  const legend = document.getElementById("legend_players_wrapper");
  legend.innerHTML = "";
  const enemy = document.createElement("div");
  enemy.classList.add("players_live");

  for (let i = 0; i < store.getState().playerLives; i++) {
    const newDiv = enemy.cloneNode();
    legend.appendChild(newDiv);
  }
}

function _displayEnemies(store) {
  const legend = document.getElementById("legend_enemies_wrapper");
  legend.innerHTML = "";
  const enemy = document.createElement("div");
  enemy.classList.add("enemies_live");

  for (let i = 0; i < store.getState().enemiesCount; i++) {
    const newDiv = enemy.cloneNode();
    legend.appendChild(newDiv);
  }
}

export function subscribe(store) {
  store.subscribe(() => _displayLives(store));
  store.subscribe(() => _displayEnemies(store));
}
