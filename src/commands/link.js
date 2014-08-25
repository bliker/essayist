var Command = require('./base-command');
var format = require('./inline-format');

module.exports = new Command('link', function (selection) {
    this.essayist.prompt({command: this.name}, function (data) {
        format(selection, 'a').forEach(function (e) {
            e.setAttribute('href', data.url);
        });
    });
});
