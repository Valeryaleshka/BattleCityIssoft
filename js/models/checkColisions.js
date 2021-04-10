import { map, tanks } from "./levelInit.js";

export function checkColisions(object1, arrayObjects) {  
  if (object1.$element && arrayObjects.length > 0) {
    _checkBoreders(object1, arrayObjects[arrayObjects.length - 1]);
  }
}

export function checkColisionsWithTank(object1, arrayObjects) {   
  if (object1.$element && arrayObjects.length > 0) {
    arrayObjects.forEach(element => {
      _checkTanks(object1, element)
    });
  }
}

function _checkTanks(gameObject1, gameObject2) {
  if (gameObject1.$element && gameObject2.$element) {
    const object_1 = gameObject1.$element.getBoundingClientRect();
    const object_2 = gameObject2.$element.getBoundingClientRect();
    if (
      object_1.left < object_2.left + object_2.width &&
      object_1.left + object_1.width > object_2.left &&
      object_1.top < object_2.top + object_2.height &&
      object_1.top + object_1.height > object_2.top
    ) {
      let i = tanks.indexOf(gameObject2);
      tanks.splice(i, 1);      
      gameObject1.deleteElement();
      gameObject2.deleteElement();
     
         
    }
  }
}

function _checkBoreders(gameObject1, gameObject2) {
  if (gameObject1.$element && gameObject2.$element) {
    const object_1 = gameObject1.$element.getBoundingClientRect();
    const object_2 = gameObject2.$element.getBoundingClientRect();
    if (
      object_1.left < object_2.left + object_2.width &&
      object_1.left + object_1.width > object_2.left &&
      object_1.top < object_2.top + object_2.height &&
      object_1.top + object_1.height > object_2.top
    ) {
      let i = map.indexOf(gameObject2);
      map.splice(i, 1);
      gameObject1.deleteElement();
      gameObject2.deleteElement();      
    }
  }
}
