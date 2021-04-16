import { UP, DOWN, RIGHT, LEFT } from "./../redux/types.js";
import { GameObject } from "./gameObject.js";
import { BULLET_SPEED } from "./settings.js";

export class Bullet extends GameObject{
  constructor(positionTop, positionLeft, tank) {
      super(positionTop, positionLeft)
    this.turrelDirection = tank.turrelDirection;
    this.className = 'bullet';
    this.type = 'bullet';
    this.$element = this.createElement(positionTop, positionLeft);
    this.tank = tank; 
    this.draw()   
  }

  move = () => {   
    if(this._checkBulletBorederColision()){
      switch (this.turrelDirection) {
        case UP:
          this.moveElement(0, BULLET_SPEED * -1);
          break;
        case DOWN:
          this.moveElement(0, BULLET_SPEED);
          break;
        case LEFT:
          this.moveElement(BULLET_SPEED * -1, 0);
          break;
        case RIGHT:
          this.moveElement(BULLET_SPEED, 0);
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
        return this.borderTop > 0;
      case DOWN:          
        return this.borderBottom < this.gameField.offsetHeight;
      case LEFT:
        return this.borderLeft > 0;
      case RIGHT:          
      return this.borderRight < this.gameField.offsetWidth;
    }
  }
}
