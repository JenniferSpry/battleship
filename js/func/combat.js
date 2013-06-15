function fieldIsShip(dx, dy){
  if (mapState[dx][dy] === 3) {
    return true;
  }
  return false;
}

function fieldIsWater(dx, dy){
  if (mapState[dx][dy] === 0) {
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

function flipGameStatus(){
  if (gameStatus === "computerTurn"){
    gameStatus = "playerTurn";
    console.log("playerTurn");
  } else if (gameStatus === "playerTurn"){
    gameStatus = "computerTurn";
    console.log("computerTurn");
  }
}

function addSunkShipToMap(ship){
 if (ship.end[0] > ship.start[0]) { //horizontal
    for (var i = ship.start[0]; i <= ship.end[0]; i++) {
      mapState[i][ship.start[1]] = 4;
      console.log("added horizontal ship to map");
    }
  } else if (ship.end[1] > ship.start[1]) { //vertikal
    for (var j = ship.start[1]; j <= ship.end[1]; j++) {
      mapState[ship.start[0]][j] = 4;
      console.log("added vertical ship to map");
    }
  }
}

// should not hit next to a ship it has already sunk
function addBorderToShip(ship, side){
  var leftBorder, rightBorder;
  if (side === "left"){
    leftBorder = 0;
    rightBorder = 11;
  } else {
    leftBorder = 10;
    rightBorder = 21;
  }
  var j, i;
  if (ship.end[0] > ship.start[0]) { //horizontal
    for (j = -1; j < 2; j++){
      for (i = ship.start[0]-1; i <= ship.end[0]+1; i++) {
        if ((mapState[i][ship.start[1]+j] < 5) && (mapState[i][ship.start[1]+j] !== 1)) { // is not hit ship or hit water
          if ((i!==leftBorder) && (i!==rightBorder) && (ship.start[1]+j !== 0) && (ship.start[1]+j !== 11)) {
            mapState[i][ship.start[1]+j] = 2;
          }
        }
      }
    }
  console.log("added horizontal ship borderto map");
  } else if (ship.end[1] > ship.start[1]) { //vertikal
    for (j = -1; j < 2; j++){
      for (i = ship.start[1]-1; i <= ship.end[1]+1; i++) {
        if ( (mapState[ship.start[0]+j][i] < 5) && (mapState[ship.start[0]+j][i] !== 1)) {
          if ((i!==0) && (i!==11) && (ship.start[0]+j !== leftBorder) && (ship.start[0]+j !== rightBorder)) {
            mapState[ship.start[0]+j][i] = 2;
          }
        }
      }
    }
    console.log("added vertical ship border to map");
  }
}