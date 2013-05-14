function checkHit (x,y,hitPoints) {
  var hitPoint = [x,y];
  for (var i = 0; i < hitPoints.length; i++) {
    if(hitPoints[i][0]===hitPoint[0] && hitPoints[i][1] === hitPoint[1]) {
      return true;
    }
  }
}

function fire(x, y){
  if ((x>0)&&(x<21)&&(y>0)&&(y<11)){
    shotsFired++;
    mapState[x][y] = 2;
    if(checkHit(x, y, hitPoints)) {
      hitsLanded++;
      mapState[x][y] = 1;
      $('.hits-landed').html(hitsLanded);
    }
  }
}