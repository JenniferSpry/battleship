function coordsToField(x, y) {
  if (x > 500) {
    x -= 40;
  }
  x = (Math.floor((x - 60) / 40)) + 1;
  y = (Math.floor((y - 125) / 40)) + 1;
  return [x, y];
}

function fieldToCoords(x, y) {
  if (x >= 11) {
    x = (x * 40) + 60;
  } else {
    x = (x * 40) - 40 + 60;
  }
  y = (y * 40) + 125 - 40;
  return [x, y];
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// gibt random boolean zurück
function getRandomBool(){
  return (Math.random() >= 0.5);
}

function getRandomDirection(){
  if (Math.random() >= 0.5){
    return -1;
  }
  return 1;
}

function getCompleteComputerShipIndex (x, y) {
  var j;
  for (var i = 0; i < computerShips.length; i++) {
    if ((computerShips[i].start[0] === x) && (computerShips[i].end[0] === x)) { // found ships column
      for (j = computerShips[i].start[1]; j <= computerShips[i].end[1]; j++) {
        if (j === y){
          return i;
        }
      }
    }
    if ((computerShips[i].start[1] === y) && (computerShips[i].end[1] === y)) { // found ships row
      for (j = computerShips[i].start[0]; j <= computerShips[i].end[0]; j++) {
        if (j === x){
          return i;
        }
      }
    }
  }
  return -1;
}

function getCompletePlayerShipIndex (ship) {
  for (var i = 0; i < playerShips.length; i++) {
    if ((playerShips[i].start[0] === ship.start[0]) && (playerShips[i].end[0] === ship.end[0]) && (playerShips[i].start[1] === ship.start[1]) && (playerShips[i].end[1] === ship.end[1])){
      console.log("got index " + i);
      return i;
    }
  }
  console.log("did not get index");
  return 0;
}