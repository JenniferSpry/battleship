function drawField (x, y, type) {
  if ((x===0)&&(y===0)){
    ctx.drawImage(image, sprites[type].sx, sprites[type].sy, sprites[type].w, sprites[type].h,
             0, 0,
             sprites[type].w, sprites[type].h);
  } else {
    ctx.drawImage(image, sprites[type].sx, sprites[type].sy, sprites[type].w, sprites[type].h,
             fieldToCoords(x,y)[0], fieldToCoords(x,y)[1],
             sprites[type].w, sprites[type].h);
  }
}

function drawFields(){

  for (var ix = 1; ix <= 20; ix++) {
    for (var iy = 1; iy <=10; iy++) {
      if (mapState[ix][iy] === 1 ){ //schiff
        drawField(ix, iy, 'smoke');
      }
      if (mapState[ix][iy] === 2 ){ //wasser
        drawField(ix, iy, 'drop');
      }
    }
  }
  for (var ix = 1; ix <= 10; ix++) { //nebel
    for (var iy = 1; iy <=10; iy++) {
      if (mapState[ix][iy] === 0 ){
        drawField(ix, iy, 'fog');
      }
    }
  }
}

function drawShips(){
  for (var i = 0; i < shipPositions.length; i++) {
    if (shipPositions[i].start[0] > 10){
      if (shipPositions[i].start[0] === shipPositions[i].end[0]){ //vertical
        drawField(shipPositions[i].start[0], shipPositions[i].start[1], "ship"+(shipPositions[i].end[1]-shipPositions[i].start[1]+1).toString());
      } else { //horizontal
        ctx.save();
        ctx.translate(fieldToCoords(shipPositions[i].start[0], shipPositions[i].start[1])[0], fieldToCoords(shipPositions[i].start[0], shipPositions[i].start[1])[1]);
        ctx.rotate(Math.PI / -2);
        drawField(0, 0, "ship"+(shipPositions[i].end[0]-shipPositions[i].start[0]+1).toString());
        ctx.restore();
      }
    }
  }
}

function drawCursor(x,y){
  if (x<1){x=1}
  else if (x>20){x=20};
  if (y<1){y=1}
  else if (y>10){y=10};
  drawField(x, y, 'cursor');
}

function drawBackground(){
  ctx.drawImage(image, sprites["bg"].sx, sprites["bg"].sy, sprites["bg"].w, sprites["bg"].h, 0, 0, sprites["bg"].w, sprites["bg"].h);
};

