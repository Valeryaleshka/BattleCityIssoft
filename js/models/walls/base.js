import { boomSound } from "../../audio/audio.js";
import {
  activateLooserScreen,
  animateDistroyedBase,
  boomAnimation,
  unlockRestartButton,
} from "../../functions/viewFunctions.js";
import { deleteWall, gameOver } from "../../redux/actionCreater.js";
import { Wall } from "../abstractModels/wall.js";
import { PLAYER_BASE } from "../types/modelTypes.js";

export class PlayerBase extends Wall {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + " playerBase";
    this.type = PLAYER_BASE;
    this.$element = this.createElement();
  }

  deleteObject() {
    this.isDrawn = false;
    this.store.dispatch(deleteWall(this));
    boomSound();
    activateLooserScreen();
    unlockRestartButton();
    this.store.dispatch(gameOver());
    boomAnimation(this);
    setTimeout(() => animateDistroyedBase(this), 335);
  }
}
