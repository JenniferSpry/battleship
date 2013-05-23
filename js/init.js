/*global document, window, Image */
var coursorpos = {x: 0, y: 0};
var shotsFired = 0;
var hitsLanded = 0;
var hitPoints;

var colorShip = "rgba(0,0,0,1)";
var colorWater = "rgba(100,100,255,1)";
var colorMiss = "rgba(150,150,255,1)";
var colorHit = "rgba(255,0,0,1)";
var colorDestroyed = "rgba(0,250,0,1)";
var colorHighLight = "rgba(0,2,1,0.2)";

var gameStatus = 0; // 0 = init, 1 = player turn, 2 = computer turn, 3 = game won, 4 = game lost
var canvas = document.getElementById('battleship');
var ctx = canvas.getContext('2d');

window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var image = new Image();
image.src = 'files/sprite.png';

var mapState = new Array(20);
var i, j;
for (i = 1; i <= 20; i++) {
  mapState[i] = new Array(10);
  for (j = 1; j <= 10; j++) {
    mapState[i][j] = 0;
    // 0=nicht beschossen
    // 1=beschossen schiff
    // 2=beschossen wasser
  }
}

var shipPositions = [
  {start: [1, 5], end: [3, 5]},
  {start: [8, 2], end: [8, 5]},
  {start: [1, 9], end: [4, 9]},
  {start: [9, 9], end: [9, 10]},
  {start: [13, 5], end: [15, 5]},
  {start: [15, 7], end: [15, 10]},
  {start: [20, 9], end: [20, 10]},
  {start: [18, 2], end: [18, 5]}
];

var sprites = {
  start:      { sx: 0, sy: 0, w: 960, h: 650, frames: 1 },
  bgposition: { sx: 0, sy: 650, w: 960, h: 650, frames: 1 },
  bg:         { sx: 0, sy: 1300, w: 960, h: 650, frames: 1 },
  ship5:      { sx: 0, sy: 1950, w: 40, h: 200, frames: 1 },
  ship4: { sx: 80, sy: 1950, w: 40, h: 160, frames: 1 },
  ship3: { sx: 160, sy: 1950, w: 40, h: 120, frames: 1 },
  ship2: { sx: 160, sy: 2070, w: 40, h: 80, frames: 1 },
  smoke: { sx: 0, sy: 2150, w: 40, h: 40, frames: 4 },
  explosion: { sx: 0, sy: 2190, w: 40, h: 40, frames: 4 },
  drop: { sx: 0, sy: 2230, w: 40, h: 40, frames: 4 },
  cursor: { sx: 40, sy: 2270, w: 40, h: 40, frames: 4},
  fog: { sx: 200, sy: 2190, w: 40, h: 40, frames: 1}
};