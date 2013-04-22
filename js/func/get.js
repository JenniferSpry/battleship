function coordsToField(x,y) {
  if(x>500){x-=40;}
  x=(Math.floor((x-60)/40))+1;
  y=(Math.floor((y-125)/40))+1;
  return [x,y];
}

function fieldToCoords (x,y) {
  x=(x*40)-40+60;
  if(x>500){x+=20;}
  y=(y*40)+125-40;
  return [x,y];
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}