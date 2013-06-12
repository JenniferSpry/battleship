/*global shotsFired, mapState, hitsLanded */
/*global $, jQuery*/

function fire(x, y) {
  if ((x > 0) && (x < 11) && (y > 0) && (y < 11)) {
    shotsFired++;
    if (mapState[x][y] === 3) { // Schiff getroffen
      mapState[x][y] = 1;
      hitsLanded++;
      $('.hits-landed').html(hitsLanded);
    } else if (mapState[x][y] === 0) { //Wasser getroffen 
      mapState[x][y] = 2;
    }
  return true;
  }
  return false;
}

function enemyFire(){
  
}