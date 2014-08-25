var undoManager = require('./undo-manager');
var EventEmitter = require('events').EventEmitter;
var bindEvents = require('./events');
var bindCommands = require('./commands');

var Essayist = function (element) {
    var self = this;
    this.el = element;

    // properties will be callable from each command
    this.cmd = bindCommands({
        emit: this.emit.bind(this),
        bell: this.bell.bind(this),
        prompt: this.prompt.bind(this),
    });

    this.undoManager = undoManager;
    bindEvents(this.emit.bind(this), this.el);

    this.on('blur', this.snap);
};

Essayist.prototype = new EventEmitter();

Essayist.prototype.undo = function () {
    var val = this.undoManager.undo();
    if (val) {
        if (val == this.getHTML()) this.undo();
        this.setHTML(val);
    }
    else this.bell();
};

Essayist.prototype.redo = function () {
    var val = this.undoManager.redo();
    if (val) this.setHTML(val);
    else this.bell();
};

Essayist.prototype.snap = function () {
    this.undoManager.snap(this.getHTML());
};

Essayist.prototype.getDOM = function () {
    return this.el.cloneNode(true);
};

Essayist.prototype.setDOM = function (val) {
    return this.el.parentElement.replaceChild(val, this.el);
};

Essayist.prototype.getHTML = function () {
    return this.el.innerHTML;
};

Essayist.prototype.setHTML = function (val) {
    this.el.innerHTML = val;
};

/**
 * Well there is no bell (*ding*) for so this is a user specified way
 * to notify about error. Like end of undo stack
 */
Essayist.prototype.bell = function () {
    console.warn('*Ding*');
};

Essayist.prototype.prompt = function (data, callback) {
    callback({url: window.prompt()});
};


module.exports = Essayist;
