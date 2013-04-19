(function() {
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    $('.cursor-position').html(mousePos.x + 'x/' + mousePos.y + 'y');
    $('.active-field').html(coordsToField(mousePos.x, mousePos.y)[0] + ',' + coordsToField(mousePos.x, mousePos.y)[1]);
    highlightField(coordsToField(mousePos.x, mousePos.y)[0], coordsToField(mousePos.x, mousePos.y)[1]);
  }, false);  
  enableDebug();
  drawPlayGround(60);
  drawPlayGround(500);
})();