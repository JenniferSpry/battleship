/*global ctx, fieldToCoords, image, sprites, mapState, shipPositions */

function drawField(x, y, type) {
  if ((x === 0) && (y === 0)) {
    ctx.drawImage(image, sprites[type].sx, sprites[type].sy, sprites[type].w, sprites[type].h,
             0, 0, sprites[type].w, sprites[type].h);
  } else {
    ctx.drawImage(image, sprites[type].sx, sprites[type].sy, sprites[type].w, sprites[type].h,
             fieldToCoords(x, y)[0], fieldToCoords(x, y)[1],
             sprites[type].w, sprites[type].h);
  }
}

function drawAniField(x, y, type, frame) {
  if ((x === 0) && (y === 0)) {
    ctx.drawImage(image, 0, sprites[type].sy, 40, 40, 0, 0, 40, 40);
  } else {
    ctx.drawImage(image, 40*frame, sprites[type].sy, 40, 40, fieldToCoords(x, y)[0], fieldToCoords(x, y)[1], 40, 40);
  }
}

function drawFields() {
  var ix, iy;
  // player map
  for (ix = 11; ix <= 20; ix++) {
    for (iy = 1; iy <= 10; iy++) {
      if (mapState[ix][iy] > 3) { // hit ship
        drawAniField(ix, iy, 'smoke', mapState[ix][iy]-4);
      }
      if (mapState[ix][iy] === 1) { // hit water
        drawField(ix, iy, 'drop');
      }
    }
  }
  // computer map
  for (ix = 1; ix <= 10; ix++) {
      for (iy = 1; iy <= 10; iy++) {
        if ((mapState[ix][iy] === 0) || (mapState[ix][iy] === 3)) { // not hit water
          ctx.drawImage(image, sprites["redMap"].sx + ix*40 - 40, sprites["redMap"].sy + iy*40 - 40, sprites["redMap"].w, sprites["redMap"].h,
               fieldToCoords(ix, iy)[0], fieldToCoords(ix, iy)[1],
               sprites["redMap"].w, sprites["redMap"].h);
        }
      }
    }
  // whole map
  if (justHitField){
    if (aniCounter < 100){
      if ((aniCounter > 9) && (aniCounter < 22)) {
        if (mapState[hitField.x][hitField.y] === 1 ){ // hit water
          drawAniField(hitField.x, hitField.y, 'drop', aniCounter - 10);
        } else { // hit ship
          drawAniField(hitField.x, hitField.y, 'explosion', aniCounter - 10);
        }
      }
      aniCounter++;
    }
  } else {
    for (ix = 1; ix <= 10; ix++) {
      for (iy = 1; iy <= 10; iy++) {
        if (mapState[ix][iy] === 1) { //getroffenes schiff
          drawField(ix, iy, 'smoke');
        }
      }
    }
  }
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
  if ((!justHitField) && (gameStatus === "playerTurn")){
    if (x < 1) {
      x = 1;
    } else if (x > 10) {
      x = 10;
    }
    if (y < 1) {
      y = 1;
    } else if (y > 10) {
      y = 10;
    }
    drawField(x, y, 'cursor');
  }
}

function clearBackground() {
  // does not clear all the way so the cannons need not be drawn all the time
  ctx.clearRect(0, 0, 960, 550);
}

function drawCannons(){
  ctx.clearRect(0, 550, 960, 650);
  if (gameStatus === "computerTurn"){
    ctx.drawImage(image, sprites["cannonup"].sx, sprites["cannonup"].sy, sprites["cannonup"].w, sprites["cannonup"].h,
               0, canvas.height - sprites["cannonup"].h, sprites["cannonup"].w, sprites["cannonup"].h);
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, sprites["cannondown"].sx, sprites["cannondown"].sy, sprites["cannondown"].w, sprites["cannondown"].h,
               0, canvas.height - sprites["cannondown"].h, sprites["cannondown"].w, sprites["cannondown"].h);
    ctx.restore();
  } else {
    ctx.drawImage(image, sprites["cannondown"].sx, sprites["cannondown"].sy, sprites["cannondown"].w, sprites["cannondown"].h,
               0, canvas.height - sprites["cannondown"].h, sprites["cannondown"].w, sprites["cannondown"].h);
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, sprites["cannonup"].sx, sprites["cannonup"].sy, sprites["cannonup"].w, sprites["cannonup"].h,
               0, canvas.height - sprites["cannonup"].h, sprites["cannonup"].w, sprites["cannonup"].h);
    ctx.restore();
  }
}