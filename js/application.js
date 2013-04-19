(function() {
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    $('.cursor-position').html(mousePos.x + 'x/' + mousePos.y + 'y');
    $('.active-field').html(coordsToField(mousePos.x, mousePos.y)[0] + ',' + coordsToField(mousePos.x, mousePos.y)[1]);
  }, false);
  canvas.addEventListener('click', function(evt) {
    shotsFired++;
    $('.shots-fired').html(shotsFired);
    var mousePos = getMousePos(canvas, evt);
    if(checkHit(coordsToField(mousePos.x, mousePos.y)[0], coordsToField(mousePos.x, mousePos.y)[1], hitPoints)) {
      hitsLanded++;
      $('.hits-landed').html(hitsLanded);
    }
  });


  enableDebug();
  drawPlayGround(60);
  drawPlayGround(500);

  for (var i = 0; i < shipPositions.length; i++) {
    hitPoints = createShip(shipPositions[i].start,shipPositions[i].end);
  }
})();