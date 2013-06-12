/*global shotsFired, mapState, hitsLanded */
/*global $, jQuery*/

function fire(x, y) {
  if ((x > 0) && (x < 11) && (y > 0) && (y < 11)) {
    shotsFired++;
    if (mapState[x][y] === 3) { // Schiff getroffen
      mapState[x][y] = 1;
      hitsLanded++;
      $('.hits-landed').html(hitsLanded);
      return true;
    } else if (mapState[x][y] === 0) { // Wasser getroffen 
      mapState[x][y] = 2;
      return true;
    } else if (mapState[x][y] === 1){ // already shot here
      return false;
    } else if (mapState[x][y] === 2){ // already shot here
      return false;
    }
  }
  return false;
}

function enemyFire() {
  var dx, dy;
  var hitNothing = true;
  // if (comJustHit === null){ // just shoot where ever
    do {
      dx = Math.floor((Math.random()*10)+10);
      dy = Math.floor((Math.random()*10)+1);
      if (mapState[dx][dy] === 0) { // hit water
        mapState[dx][dy] = 2;
        hitNothing = false;
        comJustHit = null;
      } else if (mapState[dx][dy] === 3) { // hit ship
        mapState[dx][dy] = 1;
        hitNothing = false;
        comJustHit = {x: dx, y: dy};
      }
    } while (hitNothing);
  // } else { // shot around the last hit
    
  // }
}