function checkHit (x,y,hitPoints) {
  var hitPoint = [x,y];
  for (var i = 0; i < hitPoints.length; i++) {
    if(hitPoints[i][0]===hitPoint[0] && hitPoints[i][1] === hitPoint[1]) {
      drawField(x,y,colorHit);
      alert('Treffer!');
      return true;
    } else {
      drawField(x,y,colorMiss);
    }
  }
}