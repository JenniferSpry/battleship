/*global document, window, Image */

var gameStatus = 'init'; // init, init2, playerTurn, computerTurn, gameWon, gameLost
var canvas = document.getElementById('battleship');
var ctx = canvas.getContext('2d');

var coursorpos = {x: 0, y: 0};
var shotsFired = 0;
var hitsLanded = 0;

var image = new Image();
image.src = 'img/sprites.png';

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

/*
Initialisiert alles mit 0.
Man bemerke, dass die Schiffe erst ab Feld 1|1 positionert werden
 */
for (var i = 0; i <= 21; i++) {
  mapState[i] = new Array(12);
  for (var j = 0; j <= 12; j++) {
    mapState[i][j] = 0;
    // 0=nicht beschossen Wasser
    // 1=beschossen Schiff
    // 2=beschossen Wasser
    // 3=nicht beschossen Schiff
    // 4=um schiff rum, nicht beschießen
  }
}

/**
 * @type {Array of Ship Objects}
 */
var shipPositions = [
  {start: [11, 1], end: [13, 1]},
  {start: [11, 7], end: [15, 7]},
  {start: [20, 9], end: [20, 10]},
  {start: [11, 3], end: [14, 3]},
  {start: [11, 9], end: [11, 10]},
  {start: [13, 9], end: [13, 10]},
  {start: [15, 9], end: [15, 10]},
  {start: [17, 7], end: [17, 10]},
  {start: [11, 5], end: [15, 5]},
  {start: [16, 1], end: [16, 3]},
  {start: [20, 1], end: [20, 5]},
  {start: [18, 2], end: [18, 5]}
];

var computerShips = [];


var sprites = {
  start:      { sx: 0, sy: 0, w: 960, h: 650 },
  bgposition: { sx: 0, sy: 0, w: 960, h: 650 },
  bg:         { sx: 0, sy: 0, w: 960, h: 650 },
  ship5: { sx: 0, sy: 0, w: 58, h: 200 },
  ship4: { sx: 116, sy: 0, w: 58, h: 160 },
  ship3: { sx: 232, sy: 0, w: 58, h: 120 },
  ship2: { sx: 232, sy: 120, w: 58, h: 80 },
  smoke: { sx: 0, sy: 200, w: 40, h: 40 },
  explosion: { sx: 0, sy: 240, w: 40, h: 40 },
  drop: { sx: 0, sy: 280, w: 40, h: 40 },
  cursor: { sx: 240, sy: 200, w: 40, h: 40},
  cannonup: { sx: 0, sy: 320, w: 178, h: 98},
  cannondown: { sx: 0, sy: 419, w: 199, h: 76},
  redMap: { sx: 348, sy: 0, w: 40, h: 40}
};