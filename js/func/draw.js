function drawField (x,y,color) {
  if(x>=1 && x<=20 && y<=10 && y>=1){
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect (fieldToCoords(x,y)[0], fieldToCoords(x,y)[1], 40, 40);
  }
  return [x,y];
}

function drawPlayGround(xAxis) {
  if (canvas.getContext) {
    for (var ix = 1; ix <= 20; ix++) {
      for (var iy = 0; iy <=10; iy++) {
        drawField(ix,iy,colorWater);
      }
    }
  }
}

function highlightField (x, y) {
  drawField(x, y, colorHighLight);
}
