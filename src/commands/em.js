var format = require('./inline-format');
var Command = require('./base-command');

var strong = new Command('em', function (selection) {
    format(selection, 'em');
});

strong.setShortcut(['⌘+b', 'ctrl+b']);

module.exports = strong;
