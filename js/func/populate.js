function createShip (start,end) {
  if (end[0]>start[0]) {
    for (var i = 0; start[0] <= end[0]; start[0]++) {
      drawField(start[0], start[1],'rgba(0,0,0,0.6)');
    }
  }
  if (end[1]>start[1]) {
    for (var i2=0;start[1] <= end[1]; start[1]++) {
      drawField(start[0], start[1],'rgba(0,0,0,0.6)');
    }
  }
}


createShip([1,5],[3,5]);
createShip([8,2],[8,5]);
createShip([1,9],[4,9]);
createShip([9,9],[9,10]);