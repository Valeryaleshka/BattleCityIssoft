import { PlayerTank } from "./models/playerTank.js";
import { controlKeyHandle, moveTank } from "./models/control.js";
import { KeyPRESS, KeyUNPRESS } from "./models/keyboard.js";

document.addEventListener("keydown", (e) => controlKeyHandle(e, KeyPRESS));
document.addEventListener("keyup", (e) => controlKeyHandle(e, KeyUNPRESS));

var tank = new PlayerTank(576, 288);
tank.draw();



console.log(tank);

function initialization() {}

function gameloop() {
    moveTank(tank);
    
  requestAnimationFrame(gameloop);
}

gameloop();
