var comShipIndex;
// player fires
function fire(x, y) {
var question;
  if ((x > 0) && (x < 11) && (y > 0) && (y < 11)) {
    if (checkHitNothing(x, y)){
      return false;
    } else {
      shotsFired++;
      // what did it hit?
      if (fieldIsShip(x,y)) { // hit ship
        mapState[x][y] = 5;
        hitsLanded++;
        $('.hits-landed').html(hitsLanded);
        justHitField = true; // for drawing
        hitField.x = x;
        hitField.y = y;
      } else if (fieldIsWater(x,y)) { // hit water
        justHitField = true; // for drawing
        hitField.x = x;
        hitField.y = y;
        mapState[x][y] = 1;
      }
      // was anything sunk?
      comShipIndex = getCompleteComputerShipIndex(x, y);
      if (comShipIndex != -1) { // we hit a ship, did we sink it?
        if (isComputerShipSunk(computerShips[comShipIndex])) {
          addSunkShipToMap(computerShips[comShipIndex]);
          computerShips[comShipIndex].sunk = true;
          aniCounter = 100;
        }
      } else { // we hit water did that determine a skip as sunk?
        question = didPlayerSinkAnyShip();
        if(question.answer){
          comShipIndex = question.shipIndex;
          addSunkShipToMap(computerShips[comShipIndex]);
          computerShips[comShipIndex].sunk = true;
          aniCounter = 100;
        }
      }
      return true;
    }
  }
  return false;
}

function isComputerShipSunk(ship) {
  // compare ship with mapState
  var isSunk = true;
  var i, j;
  if (ship.end[0] > ship.start[0]) { //horizontal
    // is any of the ship fields not hit?
    for (i = ship.start[0]; i <= ship.end[0]; i++) {
      if(mapState[i][ship.start[1]] === 3){
        isSunk = false;
      }
    }
    // if it is not a 5-ship check if the fields next to the ends have been hit
    if (ship.end[0] - ship.start[0] < 4) {
      if ((mapState[ship.start[0]-1][ship.start[1]] === 0) && (ship.start[0]-1 > 0)) {
        isSunk = false;
      }
      if ((mapState[ship.end[0]+1][ship.end[1]] === 0) && (ship.end[0]+1 < 11)) {
        isSunk = false;
      }
    }
  }
  if (ship.end[1] > ship.start[1]) { //vertikal
    // is any of the ship fields not hit?
    for (i = ship.start[1]; i <= ship.end[1]; i++) {
      if(mapState[ship.start[0]][i] === 3){
        isSunk = false;
      }
    }
    // if it is not a 5-ship check if the fields next to the ends have been hit
    if (ship.end[1] - ship.start[1] < 4) {
      if ((mapState[ship.start[0]][ship.start[1]-1] === 0) && (ship.start[1]-1 > 0)) {
        isSunk = false;
      }
      if ((mapState[ship.end[0]][ship.end[1]+1] === 0) && (ship.end[1]+1 < 11)) {
        isSunk = false;
      }
    }
  }
  if (isSunk){
    console.log("you sunk this ship");
  }
  return isSunk;
}

function didPlayerSinkAnyShip(){
  for (var i = 0; i < computerShips.length; i++) {
    if (!computerShips[i].sink){
      if(isComputerShipSunk(computerShips[i])){
        return {answer: true, shipIndex: i};
      }
    }
  }
  return {answer: false, shipIndex: 0};
}