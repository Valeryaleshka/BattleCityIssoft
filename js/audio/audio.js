const borderAudio = "/assets/sounds/steel.ogg";
const startAudio = "/assets/sounds/gamestart.ogg";
const gameoverAudio = "/assets/sounds/gameover.ogg";
const shotAudio = "/assets/sounds/shot.mp3";
const explosionAudio = "/assets/sounds/dead_tank.mp3";
const wallExplosionAudio = "/assets/sounds/wallHit.ogg";

export const moveSound = new Audio(window.location.href + "/assets/sounds/moveSound.wav");
moveSound.volume = 0;
moveSound.preload = "auto";
moveSound.loop = true;

export const idlingSound = new Audio(window.location.href + "/assets/sounds/stopSound.wav");
idlingSound.volume = 0;
idlingSound.preload = "auto";
idlingSound.loop = true;

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
  const audio = new Audio();
  audio.src = window.location.href + src;
  audio.volume = 0.3;
  audio.play();
}

export function muteTankSound() {
  moveSound.volume = 0;
  idlingSound.volume = 0;
}

export function unmuteTankSound() {
  idlingSound.volume = 0.15;
  moveSound.volume = 0.15;
}
