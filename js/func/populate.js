var hitPoints = [];

function createShip(start, end) {
  var i;
  if (end[0] > start[0]) {
    for (i = start[0]; i <= end[0]; i++) {
      hitPoints.push([i, start[1] - 1]);
    }
  }
  if (end[1] > start[1]) {
    for (i = start[1]; i <= end[1]; i++) {
      hitPoints.push([start[0], i]);
    }
  }
  return hitPoints;
}