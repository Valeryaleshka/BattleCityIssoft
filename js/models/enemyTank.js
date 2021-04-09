import { Tank } from "./tank.js";

export class EnemyTank extends Tank{
    constructor(positionTop, positionLeft){
        super(positionTop, positionLeft);
        this.className = this.className + 'enemy';  
        this.element = this.createElement()      
    }  
}