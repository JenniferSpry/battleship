// trage vorhandene Schiffe in die Map ein zum testen
for (i = 0; i < shipPositions.length; i++) {
  addToMap(shipPositions[i]);
}

// Position Computer Ships
function createComputerShips() {
  positionShip5();
  positionShip(4);
  positionShip(3);
  positionShip(3);
  positionShip(2);
  positionShip(2);
  positionShip(2);
  positionShip(2);
}

// beim ersten Schiff muss nicht auf Kolision geachtet werden
function positionShip5() {
  var rx, ry;
  var ship;
  if (verticalRandom()){
    rx = Math.floor(Math.random() * 10 + 1);
    ry = Math.floor(Math.random() * 6 + 1);
    ship = {start: [rx, ry], end: [rx, ry + 4]};
  } else {
    rx = Math.floor(Math.random() * 6 + 1);
    ry = Math.floor(Math.random() * 10 + 1);
    ship = {start: [rx, ry], end: [rx + 4, ry]};
  }
  addToMap(ship);
  shipPositions.push(ship);
}

function positionShip(n) {
  var ship;
  ship = createPlaceholderShip(n);
  while (colides(ship)){
    ship = createPlaceholderShip(n);
  }
  ship = stripShip(ship);
  addToMap(ship);
  shipPositions.push(ship);
}

// dieses Schiff hat einen Margin, um die Kolision zu erkennen
function createPlaceholderShip(n){
  var rx, ry;
  if (verticalRandom()){
    rx = Math.floor(Math.random() * 9 + 1);
    ry = Math.floor(Math.random() * (11 - n) + 1);
    return {start: [rx - 1, ry - 1], end: [rx + 1, ry + n]};
  } else {
    rx = Math.floor(Math.random() * (11 - n) + 1);
    ry = Math.floor(Math.random() * 9 + 1);
    return {start: [rx - 1, ry - 1], end: [rx + n, ry + 1]};
  }
}

// testet, ob dieses Schiff mit einem platzierten colidiert
function colides(ship) {
  var i, j;
  for (i = ship.start[0]; i <= ship.end[0]; i++) {
    for (j = ship.start[1]; j <= ship.end[1]; j++) {
      if (mapState[i][j] === 3) {
        return true;
      }
    }
  }
  return false;
}

function addToMap(ship){
  var i;
  if (ship.end[0] > ship.start[0]) { //horizontal
    for (i = ship.start[0]; i <= ship.end[0]; i++) {
      mapState[i][ship.start[1]] = 3;
    }
  }
  if (ship.end[1] > ship.start[1]) { //vertikal
    for (i = ship.start[1]; i <= ship.end[1]; i++) {
      mapState[ship.start[0]][i] = 3;
    }
  }
}

//entfernt den margin von den Schiffen
function stripShip(ship){
  return {start: [ship.start[0] + 1, ship.start[1] + 1], end: [ship.end[0] - 1, ship.end[1] - 1]};
}

// gibt random boolean zurück
function verticalRandom(){
  return (Math.random() >= 0.5);
}