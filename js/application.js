/*global canvas, getMousePos, shotsFired, hitPoints, mapState, hitsLanded, coursorpos */
/*global ctx, fieldToCoords, coordsToField, image, sprites, mapState, shipPositions, fire */
/*global enableDebug, drawBackground, drawShips, drawFields, drawCursor, requestAnimFrame, createShip */
/*global $, jQuery*/

(function () {
  // enableDebug();

  function animate() {
    drawBackground();
    drawShips();
    drawFields();
    drawCursor(coursorpos.x, coursorpos.y);
    requestAnimFrame(function () {
      animate();
    });
  }

function Phases() {
  this.init = function() {
    console.log('Initializing game ...');
    $('#battleship').on('click', function() {
      $(this).css('background-position', '0px 1114px');
      $(this).unbind('click');
      gameStatus = 'init2';
      createComputerShips();
      drawPlacement();
      drawShips();
      gamePhase.init2();
    });
  },
  this.init2 = function() {
    console.log('Init Phase 2');
    // drawShips();
    // animate();
  },
  this.enableCanvas = function() {
    canvas.addEventListener('mousemove', function (evt) {
      var mousePos = getMousePos(canvas, evt);
      $('.cursor-position').html(mousePos.x + 'x/' + mousePos.y + 'y');
      $('.active-field').html(coordsToField(mousePos.x, mousePos.y)[0] + ',' + coordsToField(mousePos.x, mousePos.y)[1]);
      coursorpos.x = coordsToField(mousePos.x, mousePos.y)[0];
      coursorpos.y = coordsToField(mousePos.x, mousePos.y)[1];
      $('.active-field-coord').html(fieldToCoords(coursorpos.x, coursorpos.y)[0] + ',' +  fieldToCoords(coursorpos.x, coursorpos.y)[1]);
    }, false);

    canvas.addEventListener('click', function (evt) {
      $('.shots-fired').html(shotsFired);
      $('.cursor-position').html(coursorpos.x);
      fire(coursorpos.x, coursorpos.y);
    });

  };
}

var gamePhase = new Phases();


gamePhase.init();

})();