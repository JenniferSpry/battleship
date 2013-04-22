var hitPoints = [];

function createShip (start,end) {
  if (end[0]>start[0]) {
    for (var i = 0; start[0] <= end[0]; start[0]++) {
      hitPoints.push([start[0], start[1]]);
    }
  }
  if (end[1]>start[1]) {
    for (var i2=0;start[1] <= end[1]; start[1]++) {
      hitPoints.push([start[0], start[1]]);
    }
  }
  return hitPoints;
}