import { PlayerTank } from "./models/playerTank.js";
import { controlKeyHandle, handleTankFunctions } from "./models/control.js";
import { KeyPRESS, KeyUNPRESS } from "./redux/keyboardButtons.js";
import { initAI } from "./models/ai.js";
import { levelInit, tanks } from "./models/levelInit.js";
import { createStore } from "./redux/createStore.js";
import { rootReducer } from "./redux/rootReducer.js";

document.addEventListener("keydown", (e) => controlKeyHandle(e, KeyPRESS));
document.addEventListener("keyup", (e) => controlKeyHandle(e, KeyUNPRESS));
document.addEventListener("click", () => console.log(store.getState()));

let store = createStore(rootReducer);
var tank = new PlayerTank(576, 288, store);
tanks.push(tank);

initialization();

function initialization() {
  levelInit(store);

 //initAI(store);   

  //60
 
  tank.draw();
}

function gameloop() {
  handleTankFunctions(tank);
  requestAnimationFrame(gameloop);
}

gameloop();

