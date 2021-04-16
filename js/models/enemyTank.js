import { Tank } from "./tank.js";

export class EnemyTank extends Tank{
    constructor(positionTop, positionLeft, store){
        super(positionTop, positionLeft, store);
        this.className = this.className + 'enemy';  
        this.$element = this.createElement()  
        this.type = 'enemyTank'     
    }  
}