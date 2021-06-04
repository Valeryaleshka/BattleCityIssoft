export function handleColisions(bullet, arrayOfObjects) {
  const objectWithCollisions = [];

  arrayOfObjects.forEach((gameObject) => {
    if (bullet.isDrawn && gameObject.isDrawn) {
      if (
        bullet.borderLeft < gameObject.borderRight &&
        bullet.borderRight > gameObject.borderLeft &&
        bullet.borderTop < gameObject.borderBottom &&
        bullet.borderBottom > gameObject.borderTop
      ) {
        objectWithCollisions.push(gameObject);
      }
    }
  });

  if (objectWithCollisions.length > 0) {
    bullet.deleteObject();

    objectWithCollisions.forEach((gameObject) => {
      gameObject.deleteObject(bullet);
    });
  }
}
