var system = require('system');
var page = require('webpage').create();

var cnt = system.args[1];
var newContent = '';

for (var i = 0; i < cnt; i++) {
    var newLine = system.stdin.readLine();
    newContent += newLine;
}

var fakeLocation = 'http://localhost/';
page.setContent(newContent, fakeLocation);

system.stdout.writeLine(page.content);
phantom.exit();