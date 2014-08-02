var undoManager = require('./undo-manager');var cmd = {};
var EventEmitter = require('events').EventEmitter;
var createEvents = require('./events');

var Essayist = function (element) {
    var self = this;
    this.el = element;

    createEvents(self);
}
Essayist.prototype = new EventEmitter;

module.exports = Essayist;