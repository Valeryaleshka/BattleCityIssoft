import { UP, DOWN, RIGHT, LEFT } from "./directions.js";
import { GameObject } from "./gameObject.js";
import { BULLET_SPEED } from "./settings.js";

export class Bullet extends GameObject{
  constructor(positionTop, positionLeft, tank) {
      super(positionTop, positionLeft)
    this.turrelDirection = tank.turrelDirection;
    this.className = 'bullet';
    this.$element = this.createElement(positionTop, positionLeft);
    this.tank = tank; 
    this.draw()   
  }

  move = () => {   
    if(this._checkBulletBorederColision()){
      switch (this.turrelDirection) {
        case UP:         
          this.$element.style.top = this.$element.offsetTop - BULLET_SPEED + "px";    
          this.positionTop = this.$element.offsetTop;              
          break;
        case DOWN:          
          this.$element.style.top = this.$element.offsetTop + BULLET_SPEED + "px";  
          this.positionTop =  this.$element.offsetTop;            
          break;
        case LEFT:         
          this.$element.style.left = this.$element.offsetLeft - BULLET_SPEED + "px";  
          this.positionLeft =  this.$element.offsetLeft;            
          break;
        case RIGHT:          
          this.$element.style.left = this.$element.offsetLeft + BULLET_SPEED + "px"; 
          this.positionLeft =  this.$element.offsetLeft;          
          break;
      }
    }else{      
      this.$element.remove();
      this.$element = null;     
    }
  };

  _checkBulletBorederColision = () => {    
    switch (this.turrelDirection) {
      case UP:
        return this.$element.offsetTop > 0;
      case DOWN:          
        return this.$element.offsetTop < this.gameField.offsetHeight;
      case LEFT:
        return this.$element.offsetLeft > 0;
      case RIGHT:          
      return this.$element.offsetLeft < this.gameField.offsetWidth;
    }
  }
}
