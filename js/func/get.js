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