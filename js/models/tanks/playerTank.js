import { Tank } from "./../abstractModels/tank.js";
import { BLOCK_SIZE, PLAYER_1_LEFT_POSITION, PLAYER_1_TOP_POSITION } from "./../../settings/gameSettings.js";
import { add_tank, gameOver } from "./../../redux/actionCreater.js";
import { PLAYER_TANK, UP } from "./../types/modelTypes.js";
import { activateLooserScreen, unlockRestartButton } from "../../functions/viewFunctions.js";

export class PlayerTank extends Tank {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + "player_1";
    this.type = PLAYER_TANK;
    this.$element = this.createElement();
  }

  newLive(positionTop, positionLeft) {
    this.turrelDirection = UP;
    this.borderTop = positionTop;
    this.borderLeft = positionLeft;
    this.borderRight = this.borderLeft + BLOCK_SIZE;
    this.borderBottom = this.borderTop + BLOCK_SIZE;
    this.$element = this.createElement();
    this.store.dispatch(add_tank(this));
    this.draw();
  }

  deleteObject() {
    super.deleteObject();
    if (this.store.getState().playerLives > 0) {
      this.newLive(PLAYER_1_TOP_POSITION, PLAYER_1_LEFT_POSITION);
    }
    if (this.store.getState().playerLives === 0) {
      this.store.dispatch(gameOver());
      activateLooserScreen();
      unlockRestartButton();
    }
  }
}
