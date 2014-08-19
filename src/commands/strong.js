var format = require('./inline-format');
var Command = require('./base-command');

var strong = new Command('strong', function (selection) {
    format(selection, 'strong');
});

strong.setShortcut(['⌘+b', 'ctrl+b']);

module.exports = strong;
