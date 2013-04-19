var shotsFired = 0;
var currentPhase = 'Init';
var hitsLanded = 0;
var playerActive = 'Computer';
var hitPoints;

var shipPositions = [
  {start:[1,5], end: [3,5]},
  {start:[8,2], end: [8,5]},
  {start:[1,9], end: [4,9]},
  {start:[9,9], end: [9,10]},
  {start:[13,5], end: [15,5]},
  {start:[15,7], end: [15,10]},
  {start:[20,9], end: [20,10]},
  {start:[18,2], end: [18,5]}
];

(function() {
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    $('.cursor-position').html(mousePos.x + 'x/' + mousePos.y + 'y');
    $('.active-field').html(coordsToField(mousePos.x, mousePos.y)[0] + ',' + coordsToField(mousePos.x, mousePos.y)[1]);
  }, false);
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    checkHit(coordsToField(mousePos.x, mousePos.y)[0], coordsToField(mousePos.x, mousePos.y)[1], hitPoints);
  });

  enableDebug();
  drawPlayGround(60);
  drawPlayGround(500);

  for (var i = 0; i < shipPositions.length; i++) {
    hitPoints = createShip(shipPositions[i].start,shipPositions[i].end);
  }
})();