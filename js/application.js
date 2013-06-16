(function () {
  // enableDebug();

  function animate() {
    clearBackground();
    drawRed();
    drawShips();
    drawFields();
    drawCursor(coursorpos.x, coursorpos.y);
    drawCannons();
    if (aniCounter === 100){
      justHitField = false;
      flipGameStatus();
      if (gameStatus === "computerTurn"){
        computerFire();
      } else {
        aniCounter = 1;
      }
    }
    if (gameEnd){
      if (computerHitsLanded >= 5){
        drawWonLost(false);
      } else {
        drawWonLost(true);
      }
    } else {
      requestAnimFrame(function () {
        animate();
      });
    }
  }

function Phases() {
  this.init = function() {
    console.log('Initializing game ...');
    $('#battleship').on('click', function() {
      $(this).css('background-position', '0px 1950px');
      $(this).unbind('click');
      createComputerShips();
      gamePhase.init2();
    });
  },
  this.init2 = function() {
    console.log('Placing ships...');
    gameStatus = 'init2';
    //schiffe platzieren ...
    $('#battleship').on('click', function() {
      $(this).css('background-position', '0px 1300px');
      $(this).unbind('click');
      gamePhase.init3();
    });
  },
  this.init3 = function() {
    console.log('start game...');
    gameStatus = 'init3';
    //schiffe platzieren ...
    $('#battleship').on('click', function() {
      $(this).css('background-position', '0px 650px');
      $(this).unbind('click');
      drawShips();
      gamePhase.enableCanvas();
      gamePhase.run();
    });
  },
  this.run = function() {
    console.log('running...');
    gameStatus = 'playerTurn';
    drawCannons();
    animate();
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
      $('.cursor-position').html(coursorpos.x);
      if ((gameStatus === "playerTurn") && (justHitField === false)){
        if(fire(coursorpos.x, coursorpos.y)){
          drawCannons();
        }
      }
    });

  };
}

var gamePhase = new Phases();

gamePhase.init();

})();