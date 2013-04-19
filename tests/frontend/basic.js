var date = new Date();

var casper = require('casper').create({
    viewportSize: {width: 1680, height: 1050}
});


casper.on("page.error", function (msg, trace) {
    this.echo("Error:    " + msg, "ERROR");
    this.echo("file:     " + trace[0].file, "WARNING");
    this.echo("line:     " + trace[0].line, "WARNING");
    this.echo("function: " + trace[0]["function"], "WARNING");
});

casper.on("resource.received", function(request) {
    if (request.status === 404) {
        this.echo('Resource Not Found:' + request.url, 'ERROR');
    }
});

casper.start('http://localhost/~julius/battleshipJS/', function () {
  this.echo('Page downloaded: ' + this.getCurrentUrl());
  casper.capture('screenshots/'+ date +'.png');
  this.echo('Screenshot created: '+date+'.png');
});

casper.run(function () {
  this.echo("Done.").exit();
});