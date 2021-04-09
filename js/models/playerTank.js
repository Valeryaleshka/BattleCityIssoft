import { Tank } from "./tank.js";

export class PlayerTank extends Tank{
    constructor(positionTop, positionLeft){
        super(positionTop, positionLeft);
        this.className = this.className + 'player_1';  
        this.element = this.createElement()   
        this.type = 'playerTank'   
    }     
}