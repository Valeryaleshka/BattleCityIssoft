import { map, tanks } from "./levelInit.js";

export function checkColisions(object1, arrayObjects) {  
  if (object1.$element && arrayObjects.length > 0) {
    _checkBoreders(object1, arrayObjects[arrayObjects.length - 1]);
  }
}

export function checkColisionsWithTank(object1, arrayObjects) {   
  if (object1.$element && arrayObjects.length > 0) {
    arrayObjects.forEach(element => {
      _checkBoreders(object1, element)
    });
  }
}


function _checkBoreders(gameObject1, gameObject2) {
  if (gameObject1.$element && gameObject2.$element) {    
    if (      
      gameObject1.borderLeft < gameObject2.borderRight &&
      gameObject1.borderRight > gameObject2.borderLeft &&
      gameObject1.borderTop < gameObject2.borderBottom &&
      gameObject1.borderBottom > gameObject2.borderTop
    ) {
      let i = map.indexOf(gameObject2);
      map.splice(i, 1);
      gameObject1.deleteElement();
      gameObject2.deleteElement();      
    }
  }  
}

