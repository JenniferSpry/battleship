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