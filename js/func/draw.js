function drawField (x,y,color) {
  if(x>=1 && x<=20 && y<=10 && y>=1){
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

function drawCursor(x,y){
  var s = sprites["cursor"];
  if (x<1){x=1}
  else if (x>20){x=20};
  if (y<1){y=1}
  else if (y>10){y=10};
  ctx.drawImage(image, s.sx, s.sy, 
               s.w, s.h, 
               fieldToCoords(x,y)[0], fieldToCoords(x,y)[1],
               s.w, s.h);
};

function drawBackground(){
  var s = sprites["bg"];
  ctx.drawImage(image, s.sx, s.sy, 
               s.w, s.h, 
               0, 0,
               s.w, s.h);
};

