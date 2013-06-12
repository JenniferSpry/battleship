/*global shotsFired, mapState, hitsLanded */
/*global $, jQuery*/

function fire(x, y) {
  if ((x > 0) && (x < 11) && (y > 0) && (y < 11)) {
    shotsFired++;
    if (mapState[x][y] === 3) { // Schiff getroffen
      mapState[x][y] = 1;
      hitsLanded++;
      $('.hits-landed').html(hitsLanded);
      return true;
    } else if (mapState[x][y] === 0) { // Wasser getroffen 
      mapState[x][y] = 2;
      return true;
    } else if (mapState[x][y] === 1){ // already shot here
      return false;
    } else if (mapState[x][y] === 2){ // already shot here
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
  if (!justHitShip){ // just shoot where ever
    do {
      dx = Math.floor((Math.random()*9)+11);
      dy = Math.floor((Math.random()*10)+1);
      hitNth = checkHit(dx, dy);
      if (!hitNth) { // hit something
        if(isShip(dx, dy)){
          mapState[dx][dy] = 1;
          justHitShip = true;
          foundShip = {start: [dx, dy], end: [dx, dy]};
        } else {
          mapState[dx][dy] = 2;
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
      } else if (getRandomBool){
        dx = addToX();
        dy = foundShip.start[1];
      } else {
        dy = addToY();
        dx = foundShip.start[0];
      }
      hitNth = checkHit(dx, dy);
      if (!hitNth){
        if (isShip(dx, dy)){
          mapState[dx][dy] = 1;
          addToFoundShip(dx, dy);
        } else {
          mapState[dx][dy] = 2;
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

function checkHit(dx, dy){
  if ((mapState[dx][dy] === 0) || (mapState[dx][dy] === 3)) {
    return false;
  }
  return true;
}

function addToY(){
  if ((getRandomBool) && (foundShip.start[1] > 1)) {
    return foundShip.start[1] - 1;
  } else if (foundShip.end[1] < 10){
    return foundShip.end[1] + 1;
  } else {
    return foundShip.start[1] - 1;
  }
}

function addToX(){
  if ((getRandomBool) && (foundShip.start[0] > 11)) {
    return foundShip.start[0] - 1;
  } else if (foundShip.end[0] < 20){
    return foundShip.end[0] + 1;
  } else {
    return foundShip.start[0] - 1;
  }
}

function addToFoundShip(dx, dy){
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