(function() {
  // $('#debug').hide();
  $('li .enableDebug').hide();
  $('.enableDebug').on('click', function() {
    $('li .enableDebug').hide();
    $('li .disableDebug').show();
    $('#debug').toggle();
  });
  $('.disableDebug').on('click', function() {
    $('li .disableDebug').hide();
    $('li .enableDebug').show();
    $('#debug').toggle();
  });
  drawPlayGround(60);
  drawPlayGround(350);
})();