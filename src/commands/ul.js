var Command = require('./base-command');
var insert = require('./insert-html');
var makeFragment = require('../element').makeFragment;

var html = makeFragment('<ul><li></br></li></ul>');

module.exports = new Command('ul', function (selection) {
    insert(selection, html);
});
