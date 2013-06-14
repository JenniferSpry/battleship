/*global shotsFired, mapState, hitsLanded */
/*global $, jQuery*/

function fire(x, y) {
  if ((x > 0) && (x < 11) && (y > 0) && (y < 11)) {
    shotsFired++;
    if (mapState[x][y] === 3) { // hit ship
      mapState[x][y] = 4;
      hitsLanded++;
      $('.hits-landed').html(hitsLanded);
      justHitField = true;
      hitField.x = x;
      hitField.y = y;
      return true;
    } else if (mapState[x][y] === 0) { // hit water
      justHitField = true;
      hitField.x = x;
      hitField.y = y;
      mapState[x][y] = 1;
      return true;
    } else if (mapState[x][y] > 3){ // already shot here is ship
      return false;
    } else if (mapState[x][y] === 1){ // already shot here is water
      return false;
    }
  }
  return false;
}

var justHitShip = false;
var foundShip = {start: [0, 0], end: [0, 0]};

function enemyFire() {
  var dx, dy;
  var hitNth = false;
  if (justHitShip && sunkShip()){
    justHitShip = false;
    addBorderToShip();
  }
  if (!justHitShip){ // just shoot where ever
    do {
      dx = Math.floor(Math.random() * 10) + 11;
      dy = Math.floor(Math.random() * 10) + 1;
      hitNth = checkHitNothing(dx, dy);
      if (!hitNth) { // hit something
          justHitField = true;
          hitField.x = dx;
          hitField.y = dy;
        if(isShip(dx, dy)){ // hit ship
          mapState[dx][dy] = 4;
          justHitShip = true;
          foundShip = {start: [dx, dy], end: [dx, dy]};
        } else { // hit water
          mapState[dx][dy] = 1;
        }
      }
    } while (hitNth);
  } else { // shot around the ship
    do {
      if (foundShip.end[0] > foundShip.start[0]) { // horizontal ship
        dx = addToX();
        dy = foundShip.start[1];
      } else if (foundShip.end[1] > foundShip.start[1]) { // vertical ship
        dy = addToY();
        dx = foundShip.start[0];
      } else if (getRandomBool()){
        dx = addToX();
        dy = foundShip.start[1];
      } else {
        dy = addToY();
        dx = foundShip.start[0];
      }
      hitNth = checkHitNothing(dx, dy);
      if (!hitNth){
        justHitField = true;
        hitField.x = dx;
        hitField.y = dy;
        if (isShip(dx, dy)){
          mapState[dx][dy] = 4; // hit ship
          addToFoundShip(dx, dy);
        } else {
          mapState[dx][dy] = 1; // hit water
        }
      }
    } while (hitNth);
  }
}

function isShip(dx, dy){
  if (mapState[dx][dy] === 3) {
    return true;
  }
  return false;
}

function checkHitNothing(dx, dy){
  if ((mapState[dx][dy] === 0) || (mapState[dx][dy] === 3)) { // is water or ship?
    return false;
  }
  return true;
}

function addToY(){
  if ((getRandomBool()) && (foundShip.start[1] > 1)) {
    return foundShip.start[1] - 1;
  } else if (foundShip.end[1] < 10){
    return foundShip.end[1] + 1;
  } else {
    return foundShip.start[1] - 1;
  }
}

function addToX(){
  if ((getRandomBool()) && (foundShip.start[0] > 11)) {
    return foundShip.start[0] - 1;
  } else if (foundShip.end[0] < 20){
    return foundShip.end[0] + 1;
  } else {
    return foundShip.start[0] - 1;
  }
}

function addToFoundShip(dx, dy) {
  if (dx > foundShip.end[0]) {
    foundShip.end[0] = dx;
  } else if (dx < foundShip.start[0]) {
    foundShip.start[0] = dx;
  } else if (dy > foundShip.end[1]) {
    foundShip.end[1] = dy;
  } else if (dy < foundShip.start[1]) {
    foundShip.start[1] = dy;
  }
}

function sunkShip() {
  if ( (foundShip.end[0] - foundShip.start[0] == 4) || (foundShip.end[1] - foundShip.start[1] == 4) ) { // 5-ships
    console.log("ship sunk 5");
    return true;
  } else if ( (foundShip.start[0] != foundShip.end[0]) && ((mapState[foundShip.start[0] - 1][foundShip.start[1]] === 1) || (mapState[foundShip.start[0] - 1][foundShip.start[1]] === 2) || (foundShip.start[0] === 11)) && ((mapState[foundShip.end[0] + 1][foundShip.end[1]] === 1) || (mapState[foundShip.end[0] + 1][foundShip.end[1]] === 2) || (foundShip.end[0] === 20)) ) {
    console.log("ship sunk x");
    return true;
  } else if ( (foundShip.start[1] != foundShip.end[1]) && ((mapState[foundShip.start[0]][foundShip.start[1]-1] === 1) || (mapState[foundShip.start[0]][foundShip.start[1]-1] === 2) || (foundShip.start[1] === 1)) && ((mapState[foundShip.end[0]][foundShip.end[1]+1] === 1) || (mapState[foundShip.end[0]][foundShip.end[1]+1] === 2) || (foundShip.end[1] === 10)) ) {
    console.log("ship sunk y");
    return true;
  }
  return false;
}

// should not hit next to a ship it has already sunk
function addBorderToShip(){
  var j, i;
  if (foundShip.end[0] > foundShip.start[0]) { //horizontal
    for (j = -1; j < 2; j++){
      for (i = foundShip.start[0]-1; i <= foundShip.end[0]+1; i++) {
        if ((mapState[i][foundShip.start[1]+j] < 4) && (mapState[i][foundShip.start[1]+j] !== 1)) { // is not hit ship or hit water
          if ((i!==10) && (i!==21) && (foundShip.start[1]+j !== 0) && (foundShip.start[1]+j !== 11)) {
            mapState[i][foundShip.start[1]+j] = 2;
          }
        }
      }
    }
  }
  if (foundShip.end[1] > foundShip.start[1]) { //vertikal
    for (j = -1; j < 2; j++){
      for (i = foundShip.start[1]-1; i <= foundShip.end[1]+1; i++) {
        if ( (mapState[foundShip.start[0]+j][i] < 4) && (mapState[foundShip.start[0]+j][i] !== 1)) {
          if ((i!==0) && (i!==11) && (foundShip.start[0]+j !== 10) && (foundShip.start[0]+j !== 21)) {
            mapState[foundShip.start[0]+j][i] = 2;
          }
        }
      }
    }
  }
}

function flipGameStatus(){
  if (gameStatus === "computerTurn"){
    gameStatus = "playerTurn";
    console.log("playerTurn");
  } else if (gameStatus === "playerTurn"){
    gameStatus = "computerTurn";
    console.log("computerTurn");
  }
}