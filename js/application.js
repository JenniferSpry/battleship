(function() {
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    $('.cursor-position').html(mousePos.x + 'x/' + mousePos.y + 'y');
    $('.active-field').html(coordsToField(mousePos.x, mousePos.y)[0] + ',' + coordsToField(mousePos.x, mousePos.y)[1]);
  }, false);
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    highlightField(coordsToField(mousePos.x, mousePos.y)[0], coordsToField(mousePos.x, mousePos.y)[1]);
  });

  

  enableDebug();
  drawPlayGround(60);
  drawPlayGround(500);
})();