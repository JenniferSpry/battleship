function drawPlayGround(xAxis) {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var yAxis = 90;
    var xAxisT = xAxis;
    for (var i = 1; i <= 100; i++) {
      ctx.fillStyle = "rgb(150,150,255)";
      ctx.fillRect (xAxisT, yAxis, 25, 25);
      console.log(xAxisT + ', ' + yAxis);
      xAxisT += 27;
      if(i%10===0) {
      // if (i===10 || i===20 || i===30 || i===40 || i===50 || i===60 || i===70 || i===80 || i===90) {
        yAxis += 27;
        xAxisT = xAxis;
      }
    }
  }
}