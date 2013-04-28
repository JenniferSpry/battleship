(function() {

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    $('.cursor-position').html(mousePos.x + 'x/' + mousePos.y + 'y');
    $('.active-field').html(coordsToField(mousePos.x, mousePos.y)[0] + ',' + coordsToField(mousePos.x, mousePos.y)[1]);
    coursorpos.x = coordsToField(mousePos.x, mousePos.y)[0];
    coursorpos.y = coordsToField(mousePos.x, mousePos.y)[1];
    $('.active-field-coord').html(fieldToCoords(coursorpos.x, coursorpos.y)[0] + ',' +  fieldToCoords(coursorpos.x, coursorpos.y)[1]);
  }, false);

  canvas.addEventListener('click', function(evt) {
    shotsFired++;
    $('.shots-fired').html(shotsFired);
    $('.cursor-position').html(coursorpos.x);
    mapState[coursorpos.x][coursorpos.y] = 2;
    if(checkHit(coursorpos.x, coursorpos.y, hitPoints)) {
      hitsLanded++;
      mapState[coursorpos.x][coursorpos.y] = 1;
      $('.hits-landed').html(hitsLanded);
    } 
  });

  enableDebug();

  function animate() {

    drawBackground();
    // drawPlayGround(60);
    // drawPlayGround(500);
    drawFields();
    drawShips();
    drawCursor(coursorpos.x, coursorpos.y);
    
    requestAnimFrame(function() {
      animate();
    });
  }

  animate();

  for (var i = 0; i < shipPositions.length; i++) {
    //hitPoints = createShip(shipPositions[i].start,shipPositions[i].end);
  }
})();