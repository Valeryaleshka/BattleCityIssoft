import { GameObject } from "./gameObject.js";

export class BrickWall extends GameObject{
    constructor(positionTop, positionLeft){
        super(positionTop, positionLeft);
        this.className = this.className + ' brickWall';
        this.type = 'brickWall';
        this.$element = this.createElement();
    }
}