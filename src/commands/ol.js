var Command = require('./base-command');
var insert = require('./insert-html');
var makeFragment = require('../element').makeFragment;

var html = makeFragment('<ol><li></br></li></ol>');

module.exports = new Command('ol', function (selection) {
    insert(selection, html);
});
