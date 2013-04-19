function checkHit (x,y,hitPoints) {
  var hitPoint = [x,y];
  for (var i = 0; i < hitPoints.length; i++) {
    if(hitPoints[i][0]===hitPoint[0] && hitPoints[i][1] === hitPoint[1]) {
      drawField(x,y,"rgba(0,250,0,0.2)");
      alert('Treffer!');
    } else {
      drawField(x,y,"rgba(255,0,0,0.2)");
    }
  }
}