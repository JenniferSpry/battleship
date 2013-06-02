/*global ctx, fieldToCoords, image, sprites, mapState, shipPositions */

function drawField(x, y, type) {
  if ((x === 0) && (y === 0)) {
    ctx.drawImage(image, sprites[type].sx, sprites[type].sy, sprites[type].w, sprites[type].h,
             0, 0,
             sprites[type].w, sprites[type].h);
  } else {
    ctx.drawImage(image, sprites[type].sx, sprites[type].sy, sprites[type].w, sprites[type].h,
             fieldToCoords(x, y)[0], fieldToCoords(x, y)[1],
             sprites[type].w, sprites[type].h);
  }
}

function drawFields() {
  var ix, iy;
  for (ix = 1; ix <= 20; ix++) {
    for (iy = 1; iy <= 10; iy++) {
      if (mapState[ix][iy] === 1) { //schiff
        drawField(ix, iy, 'smoke');
      }
      if (mapState[ix][iy] === 2) { //wasser
        drawField(ix, iy, 'drop');
      }
    }
  }
  // for (ix = 1; ix <= 10; ix++) { //nebel
  //   for (iy = 1; iy <= 10; iy++) {
  //     if (mapState[ix][iy] === 0) {
  //       drawField(ix, iy, 'fog');
  //     }
  //   }
  // }
}

function drawShip(ship) {
  if (ship.start[0] > 0) {
    if(ship.start[0] === ship.end[0]) {
      drawField(ship.start[0], ship.start[1], "ship" + (ship.end[1] - ship.start[1] + 1).toString());
    } else { //horizontal
      ctx.save();
      ctx.translate(fieldToCoords(ship.start[0], ship.start[1])[0], fieldToCoords(ship.start[0], ship.start[1] + 1)[1]);
      ctx.rotate(Math.PI / -2);
      drawField(0, 0, "ship" + (ship.end[0] - ship.start[0] + 1).toString());
      ctx.restore();
    }
  }
}

function drawShips() {
  var i;
  for (i = 0; i < shipPositions.length; i++) {
    drawShip(shipPositions[i]);
  }
}

function drawCursor(x, y) {
  if (x < 1) {
    x = 1;
  } else if (x > 20) {
    x = 20;
  }
  if (y < 1) {
    y = 1;
  } else if (y > 10) {
    y = 10;
  }
  drawField(x, y, 'cursor');
}

function drawBackground() {
  ctx.clearRect(0, 0, 950, 650);
}

function drawPlacement() {
  ctx.beginPath();
  ctx.rect(60, 125, 400, 400);
  ctx.fillStyle = 'rgba(165,25,18,0.9)';
  ctx.fill();
}