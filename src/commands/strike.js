var format = require('./inline-format');
var Command = require('./base-command');

var strong = new Command('strike', function (selection) {
    format(selection, 'strike');
});

strong.setShortcut(['⌘+b', 'ctrl+b']);

module.exports = strong;
