import { PlayerTank } from "./models/playerTank.js";
import { controlKeyHandle, handleTankFunctions } from "./models/control.js";
import { KeyPRESS, KeyUNPRESS } from "./models/keyboard.js";
import { initAI } from "./models/ai.js";
import { levelInit, tanks } from "./models/levelInit.js";

document.addEventListener("keydown", (e) => controlKeyHandle(e, KeyPRESS));
document.addEventListener("keyup", (e) => controlKeyHandle(e, KeyUNPRESS));

const tank = new PlayerTank(576, 288);
tanks.push(tank);

initialization();

function initialization() {
  levelInit();

  initAI();
  initAI();

  tank.draw();
}

function gameloop() {
  handleTankFunctions(tank);
  requestAnimationFrame(gameloop);
}

gameloop();
console.log(tanks)
