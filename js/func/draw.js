function drawFields(){
  var f = sprites["fog"];
  var s = sprites["smoke"];
  var w = sprites["drop"];
  for (var ix = 1; ix <= 20; ix++) {
    for (var iy = 1; iy <=10; iy++) {
      if (mapState[ix][iy] == 1 ){ //schiff
        ctx.drawImage(image, s.sx, s.sy, s.w, s.h, 
             fieldToCoords(ix,iy)[0], fieldToCoords(ix,iy)[1],
             s.w, s.h);
      }
      if (mapState[ix][iy] == 2 ){ //wasser
        ctx.drawImage(image, w.sx, w.sy, w.w, w.h, 
             fieldToCoords(ix,iy)[0], fieldToCoords(ix,iy)[1],
             w.w, w.h);
      }
    }
  }
  for (var ix = 1; ix <= 10; ix++) { //nebel
    for (var iy = 1; iy <=10; iy++) {
      if (mapState[ix][iy] == 0 ){
        ctx.drawImage(image, f.sx, f.sy, f.w, f.h, 
             fieldToCoords(ix,iy)[0], fieldToCoords(ix,iy)[1],
             f.w, f.h);
      }
    }
  }
}

function drawShips(){
  var s2 = sprites["ship2"];
  var s3 = sprites["ship3"];
  var s4 = sprites["ship4"];
  var s5 = sprites["ship5"];
  for (var i = 1; i <= 20; i++) {
    if (shipPositions[i].start[0] > 10){
      if (shipPositions[i].start[1] == shipPositions[i].end[1]){
        var laenge = shipPositions[i].start[0] - shipPositions[i].end[0];
        switch(laenge){
        // case 1:
        //   execute code block 1
        //   break;
        // case 2:
        //   execute code block 2
        //   break;
        default:
          ctx.drawImage(image, s2.sx, s2.sy, s2.w, s2.h, 
             shipPositions[i].start[0], shipPositions[i].start[1],
             s2.w, s2.h);
        }
      }
    }
  }
}

function drawCursor(x,y){
  var s = sprites["cursor"];
  if (x<1){x=1}
  else if (x>20){x=20};
  if (y<1){y=1}
  else if (y>10){y=10};
  ctx.drawImage(image, s.sx, s.sy, 
               s.w, s.h, 
               fieldToCoords(x,y)[0], fieldToCoords(x,y)[1],
               s.w, s.h);
};

function drawBackground(){
  var s = sprites["bg"];
  ctx.drawImage(image, s.sx, s.sy, 
               s.w, s.h, 
               0, 0,
               s.w, s.h);
};

