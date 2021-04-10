import { BrickWall } from "./brickWall.js";
import { LEVEL1, MAP_LEGEND } from "./map.js";

export const map = []
export const tanks = []

export function levelInit(){   

    for(let i = 0; i< LEVEL1.length; i++){    
        let positionTop = i*48;
        for(let j = 0; j<LEVEL1[i].length; j++){
            let positionLeft = j*48;
           if(LEVEL1[i][j] == MAP_LEGEND.WALL){
               let temp = new BrickWall(positionTop,positionLeft); 
               temp.draw();              
               map.push(temp)
           }
        }
    } 
}