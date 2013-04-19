var scriptsArray = [];
var imagesArray = [];

function getImages() {
  var scripts = document.querySelectorAll('img[src]');
  return Array.prototype.map.call(scripts, function (e) {
    return e.getAttribute('src');
  });
}

function getScripts() {
  var scripts = document.querySelectorAll('script[src]');
  return Array.prototype.map.call(scripts, function(e) {
    return e.getAttribute('src');
  });
}

var casper = require('casper').create();
casper.start('http://localhost/~julius/battleshipJS/', function () {
  this.echo('page downloaded: ' + this.getCurrentUrl());
  scriptsArray = this.evaluate(getScripts);
  var self = this;
  scriptsArray.forEach(function(item) {
    if (self.resourceExists(item)) {
      self.echo(item + ' loaded');
    } else {
      self.echo(item + ' not loaded', 'ERROR');
    }
  });
  imagesArray = this.evaluate(getImages);
  self = this;
  imagesArray.forEach(function (item) {
    if (self.resourceExists(item)) {
      self.echo(item + ' loaded');
    } else {
      var message = item + ' not loaded';
      self.echo(message, 'ERROR');
    }
  });
  if (this.isThereAnError === false) {
      casper.capture('noimages.png');
  }
});

casper.run(function () {
  this.echo("Done.").exit();
});