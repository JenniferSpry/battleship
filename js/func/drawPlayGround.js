function drawPlayGround(xAxis) {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var yAxis = 90;
    var xAxisTemp = xAxis;
    ctx.fillStyle = "rgb(150,150,255)";
    for (var i = 1; i <= 100; i++) {
      ctx.fillRect (xAxisTemp, yAxis, 25, 25);
      console.log(xAxisTemp + ', ' + yAxis);
      xAxisTemp += 27;
      if(i%10===0) {
        yAxis += 27;
        xAxisTemp = xAxis;
      }
    }
  }
}