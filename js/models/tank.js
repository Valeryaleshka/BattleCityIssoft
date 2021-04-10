import { UP, DOWN, RIGHT, LEFT } from "./directions.js";
import { GameObject } from "./gameObject.js";
import { TANK_SPEED } from "./settings.js";
import { Bullet } from "./bullet.js";

export class Tank extends GameObject {
  constructor(positionTop, positionLeft) {
    super(positionTop, positionLeft);
    this.className = this.className + " tank_";
    this.type = "tank";
    this.turrelDirection = UP;
    this.$element = this.createElement();
    this.isShoted = false;
    this.bullet = null;
  }

  moveUp = () => {    
    this._changeTurrelDirection(UP);
    this._move();
  };

  moveDown = () => {
    this._changeTurrelDirection(DOWN);
    this._move();
  };

  moveLeft = () => {
    this._changeTurrelDirection(LEFT);
    this._move();
  };

  moveRight = () => {
    this._changeTurrelDirection(RIGHT);
    this._move();   
  };

  shot = () => {
    if (!this.isShoted) {
      this.isShoted = true;
      this.bullet = new Bullet(
        this.positionTop + 21,
        this.positionLeft + 21,  
        this      
      );
      this.bullet.draw();
      this._poof()
    }
  }; 

  _poof = () =>{    
    if(this.bullet.$element){
      this.bullet.move();
      requestAnimationFrame(this._poof)
    }else{
      this.bullet = null;
      this.isShoted = false
    }
  }

  _move = () => {
    if (this._checkTankBorderColision()) {
      switch (this.turrelDirection) {
        case UP:          
          this.$element.style.top = this.$element.offsetTop - TANK_SPEED + "px";
          this.positionTop = this.$element.offsetTop;
          break;
        case DOWN:          
          this.$element.style.top = this.$element.offsetTop + TANK_SPEED + "px";
          this.positionTop = this.$element.offsetTop;
          break;
        case LEFT:         
          this.$element.style.left = this.$element.offsetLeft - TANK_SPEED + "px";
          this.positionLeft = this.$element.offsetLeft;
          break;
        case RIGHT:        
          this.$element.style.left = this.$element.offsetLeft + TANK_SPEED + "px";
          this.positionLeft = this.$element.offsetLeft;
          break;
      }
    }
  };

  _checkTankBorderColision = () => {
    switch (this.turrelDirection) {
      case UP:
        return this.$element.offsetTop - TANK_SPEED >= this.gameField.offsetTop;
      case DOWN:
        return (
          this.$element.offsetTop + this.$element.offsetHeight + TANK_SPEED <=
          this.gameField.offsetHeight
        );
      case LEFT:
        return (
          this.$element.offsetLeft - TANK_SPEED >= this.gameField.offsetLeft
        );
      case RIGHT:
        return (
          this.$element.offsetLeft + this.$element.offsetWidth + TANK_SPEED <=
          this.gameField.offsetWidth
        );
    }
  };

  _changeTurrelDirection = (direction) => {
    
    this.turrelDirection = direction;    
    switch (this.turrelDirection) {
      case UP:
        this.$element.style.transform = "rotate(0deg)";
        break;
      case DOWN:
        this.$element.style.transform = "rotate(180deg)";
        break;
      case LEFT:
        this.$element.style.transform = "rotate(270deg)";
        break;
      case RIGHT:
        this.$element.style.transform = "rotate(90deg)";
        break;
    }
  };
}
