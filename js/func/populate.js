// trage vorhandene Schiffe in die Map ein zum testen
for (var i = 0; i < shipPositions.length; i++) {
  addToMap(shipPositions[i]);
}

function createComputerShips() {
  var res = false;
  do {
    res = createComputerShipsLoop();
  }
  while (res === false);
}

// Position Computer Ships
function createComputerShipsLoop() {
  positionShip5();
  var toBePlaced = [4, 4, 3, 3, 3, 2 ,2 ,2 ,2];
  for (var a in toBePlaced) {
    if (!(positionShip(toBePlaced[a], 40))) {
      cleanLeftMap();
      computerShips = [];
      return false;
    }
  }
  return true;
}

// beim ersten Schiff muss nicht auf Kolision geachtet werden
function positionShip5() {
  var rx, ry;
  var ship;
  if (getRandomBool()){
    rx = Math.floor(Math.random() * 10 + 1);
    ry = Math.floor(Math.random() * 6 + 1);
    ship = {start: [rx, ry], end: [rx, ry + 4]};
  } else {
    rx = Math.floor(Math.random() * 6 + 1);
    ry = Math.floor(Math.random() * 10 + 1);
    ship = {start: [rx, ry], end: [rx + 4, ry]};
  }
  addToMap(ship);
  computerShips.push(ship);
}

function positionShip(n, max) {
  var ship;
  var b = 0;
  ship = createPlaceholderShip(n);
  while ((colides(ship)) && (b < max)){
    ship = createPlaceholderShip(n);
    b++;
  }
  if (colides(ship)){
    return false;
  } else {
    ship = stripShip(ship);
    addToMap(ship);
    computerShips.push(ship);
    return true;
  }
}

// dieses Schiff hat einen Margin, um die Kolision zu erkennen
function createPlaceholderShip(n){
  var rx, ry;
  if (getRandomBool()){
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
  if (ship.end[0] > ship.start[0]) { //horizontal
    for (var i = ship.start[0]; i <= ship.end[0]; i++) {
      mapState[i][ship.start[1]] = 3;
    }
  }
  if (ship.end[1] > ship.start[1]) { //vertikal
    for (var j = ship.start[1]; j <= ship.end[1]; j++) {
      mapState[ship.start[0]][j] = 3;
    }
  }
}

function cleanLeftMap(){
  for (var i = 0; i <= 10; i++) {
    for (var j = 0; j <= 12; j++) {
      mapState[i][j] = 0;
    }
  }
}

//entfernt den margin von den Schiffen
function stripShip(ship){
  return {start: [ship.start[0] + 1, ship.start[1] + 1], end: [ship.end[0] - 1, ship.end[1] - 1]};
}