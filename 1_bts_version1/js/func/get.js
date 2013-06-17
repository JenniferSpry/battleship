function coordsToField(x,y) {
  if(x>500){x-=20;}
  x=(Math.floor((x-60)/42))+1;
  y=(Math.floor((y-90)/42))+1;
  return [x,y];
}

function fieldToCoords (x,y) {
  x=(x*42)-42+60;
  if(x>479){x+=20;}
  y=(y*42)+90-42;
  return [x,y];
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}