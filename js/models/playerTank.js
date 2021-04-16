import { tanks } from "./levelInit.js";
import { Tank } from "./tank.js";
import { BLOCK_SIZE } from "./settings.js";
import { add_tank } from "../redux/actionCreater.js";

export class PlayerTank extends Tank {
  constructor(positionTop, positionLeft, store) {
    super(positionTop, positionLeft, store);
    this.className = this.className + "player_1";
    this.$element = this.createElement();
    this.type = "playerTank";
    this.store.dispatch(add_tank(this));
  }

  createElement = () => {
    const $element = document.createElement("div");
    $element.className = this.className;
    $element.style.top = this.borderTop + "px";
    $element.style.left = this.borderLeft + "px";


    this.borderBottom = this.borderTop + BLOCK_SIZE;
    this.borderRight = this.borderLeft + BLOCK_SIZE;

    //this.store.dispatch(add_tank(this))

    return $element;
  };

  newLive = (positionTop, positionLeft) => {
    this.borderTop = positionTop;
    this.borderLeft = positionLeft;
    this.borderRight = this.borderLeft + BLOCK_SIZE;
    this.borderBottom = this.borderTop + BLOCK_SIZE;
    this.$element = this.createElement();
    this.draw();
    tanks.push(this);
  };
}
