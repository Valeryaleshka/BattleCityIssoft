const borderAudio = "./../../assets/sounds/wallHit.ogg";
const startAudio = "./../../assets/sounds/gamestart.ogg";
const gameoverAudio = "./../../assets/sounds/gameover.ogg";
const shotAudio = "./../../assets/sounds/shot.mp3";
const explosionAudio = "./../../assets/sounds/dead_tank.mp3";
const wallExplosionAudio = "./../../assets/sounds/wallHit.ogg";

export function shotSound() {
  _playSound(shotAudio);
}

export function boomSound() {
  _playSound(explosionAudio);
}

export function borderExplosionSound() {
  _playSound(borderAudio);
}

export function wallExplosionSound() {
  _playSound(wallExplosionAudio);
}

export function startSound() {
  _playSound(startAudio);
}

export function gameOverSound() {
  _playSound(gameoverAudio);
}

function _playSound(src) {
  const audio = new Audio(src);
  audio.play();
}
