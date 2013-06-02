/*global document, window, Image */

var gameStatus = 'init'; // init, init2, playerTurn, computerTurn, gameWon, gameLost
var canvas = document.getElementById('battleship');
var ctx = canvas.getContext('2d');

var coursorpos = {x: 0, y: 0};
var shotsFired = 0;
var hitsLanded = 0;

var image = new Image();
image.src = 'img/sprite.png';

/*
Animationsgeschwindigkeit
 */
window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

/**
 * Enthält die Informationen zu jedem einzelnen Feld.
 * @type {Array of Arrays}
 */
var mapState = new Array(20);
var i, j;

/*
Initialisiert alles mit 0.
Man bemerke, dass die Schiffe erst ab Feld 1|1 positionert werden
 */
for (i = 0; i <= 21; i++) {
  mapState[i] = new Array(12);
  for (j = 0; j <= 12; j++) {
    mapState[i][j] = 0;
    // 0=nicht beschossen Wasser
    // 1=beschossen Schiff
    // 2=beschossen Wasser
    // 3=nicht beschossen Schiff
  }
}


/**
 * @type {Array of Ship Objects}
 */

var shipPositions = [
  {start: [1, 1], end: [3, 1]},
  {start: [1, 7], end: [15, 10]},
  {start: [20, 9], end: [20, 10]},
  {start: [18, 2], end: [18, 5]}
];


var sprites = {
  start:      { sx: 0, sy: 0, w: 960, h: 650, frames: 1 },
  bgposition: { sx: 0, sy: 650, w: 960, h: 650, frames: 1 },
  bg:         { sx: 0, sy: 1300, w: 960, h: 650, frames: 1 },
  ship5:      { sx: 0, sy: 1950, w: 58, h: 200, frames: 1 },
  ship4: { sx: 116, sy: 1950, w: 58, h: 160, frames: 1 },
  ship3: { sx: 232, sy: 1950, w: 58, h: 120, frames: 1 },
  ship2: { sx: 232, sy: 2070, w: 58, h: 80, frames: 1 },
  smoke: { sx: 0, sy: 2150, w: 40, h: 40, frames: 4 },
  explosion: { sx: 0, sy: 2190, w: 40, h: 40, frames: 4 },
  drop: { sx: 0, sy: 2230, w: 40, h: 40, frames: 6 },
  cursor: { sx: 40, sy: 2270, w: 40, h: 40, frames: 1},
  fog: { sx: 200, sy: 2190, w: 40, h: 40, frames: 1}
};