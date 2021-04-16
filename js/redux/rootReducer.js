export function rootReducer(state, action) {
 /* if (action.type === "PAUSE") {
    let pause = document.querySelector(".paused_screen");
    pause.classList.toggle("hiden");
    return { ...state, isPaused: !state.isPaused };
  }

  if (action.type === "ADD_TANK") {
    let temp = state.enemiesTanks.slice(0);
    temp.push(action.tank);

    return { ...state, enemiesTanks: temp };
  }

  if (action.type === "ADD_PLAYER") {
    return { ...state, playerTank: action.tank };
  }

  if (action.type === "KILL_PLAYER") {
    let temp = state.playerTank;
    temp.style.top = "832px";
    temp.style.left = "256px";

    let currentLives = state.lives - 1;

    if (currentLives === 0) {
      alert("gameOver");
      window.location.reload();
      return { ...state, isPaused: true };
    } else {
      return { ...state, playerTank: temp, lives: currentLives };
    }
  }

  if (action.type === "DELETE_ENEMY") {
    let temp = state.enemiesTanks
      .slice(0)
      .filter((elem) => elem !== action.tank);

    return {
      ...state,
      enemiesTanks: temp,
      enemiesCount: state.enemiesCount - 1,
    };
  }
*/
  if (action.type === "INIT") {
    return {      
      tanks: [],
      walls: [],
      enemiesCount: 21,
      playerLives: 3, 
      IS_GAME_OVER: false,      
    };
  }

  if(action.type === "ADD_WALL"){
    let temp = state.walls.slice(0);
    temp.push(action.wall);
    
    return { ...state, walls: temp};
  }

  if(action.type === "ADD_TANK"){
    let temp = state.tanks.slice(0);
    temp.push(action.tank);
    
    return { ...state, tanks: temp};
  }
  
  if (action.type === "GAME_OVER") {
    return { ...state, IS_GAME_OVER: true };
  }
}
