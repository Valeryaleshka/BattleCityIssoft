import { add_wall } from "../redux/actionCreater.js";
import { BrickWall } from "./brickWall.js";
import { LEVEL1, MAP_LEGEND } from "./map.js";
import { BLOCK_SIZE } from "./settings.js";

export const map = []
export let tanks = []

export function levelInit(store){   

    for(let i = 0; i< LEVEL1.length; i++){    
        let positionTop = i*BLOCK_SIZE;
        for(let j = 0; j<LEVEL1[i].length; j++){
            let positionLeft = j*BLOCK_SIZE;
           if(LEVEL1[i][j] == MAP_LEGEND.WALL){
               let temp = new BrickWall(positionTop,positionLeft); 
               temp.draw();              
               map.push(temp)
               store.dispatch(add_wall(temp))
           }
        }
    } 
}