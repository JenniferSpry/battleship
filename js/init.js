
var gameStatus = 'init'; // init, init2, playerTurn, computerTurn
var canvas = document.getElementById('battleship');
var ctx = canvas.getContext('2d');

var coursorpos = {x: 0, y: 0};
var computerHitsLanded = 0;
var playerHitsLanded = 0;
var gameEnd = false;

var justHitField = false;
var aniCounter = 1;
var hitField = {x: 0, y: 0};

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
    // 0 = nicht beschossen Wasser
    // 1 = beschossen Wasser
    // 2 = um schiff rum, nicht beschießen
    // 3 = nicht beschossen Schiff
    // 4 = sunk ship
    // >5 = beschossen Schiff Nummer ist gleich animations Frame
  }
}

/**
 * @type {Array of Ship Objects}
 */
var playerShips = [
  {start: [11, 3], end: [12, 3], sunk: false},
  {start: [11, 6], end: [15, 6], sunk: false},
  {start: [11, 9], end: [13, 9], sunk: false},
  {start: [14, 1], end: [16, 1], sunk: false},
  {start: [14, 4], end: [15, 4], sunk: false},
  {start: [17, 3], end: [20, 3], sunk: false},
  {start: [17, 5], end: [18, 5], sunk: false},
  {start: [15, 8], end: [15, 9], sunk: false},
  {start: [17, 8], end: [17, 10], sunk: false},
  {start: [19, 7], end: [19, 10], sunk: false}
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
  cursor: { sx: 480, sy: 200, w: 40, h: 40},
  cannonup: { sx: 0, sy: 320, w: 174, h: 98},
  cannondown: { sx: 175, sy: 342, w: 197, h: 76},
  redMap: { sx: 560, sy: 0, w: 40, h: 40},
  dropEnd: { sx: 480, sy: 280, w: 40, h: 40 }
};