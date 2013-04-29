var hitPoints = [];

function createShip (start,end) {
  if (end[0]>start[0]) {
    for (var i = start[0]; i <= end[0]; i++) {
      hitPoints.push([i, start[1]-1]);
    }
  }
  if (end[1]>start[1]) {
    for (var i2 = start[1]; i2 <= end[1]; i2++) {
      hitPoints.push([start[0], i2]);
    }
  }
  return hitPoints;
}