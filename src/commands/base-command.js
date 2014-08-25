var Command = function (name, execute) {
    this.name = name;
    this.essayist = {};
    execute ? this.execute = execute : '';
};

/**
 * Sets shortcut that will invoke this command globally
 * @param {String|Array} shortcuts in text form like "Ctrl+S"
 */
Command.prototype.setShortcut = function(shortcuts) {
    // noop
};

/**
 * Should unbind all event listeners and
 * clear up all the unwanted stuff
 */
Command.prototype.destroy = function () {
    // noop
};

/**
 * Called when command is bound to essayist usefull for setting out event
 * listeners and general one-off tasks
 * @param  {Function} emit Can be used to emit events on main Object
 */
Command.prototype.init = function () {

};

/**
 * Called when command is executed
 * @param  {Selection} selection Current selection
 */
Command.prototype.execute = function (selection) {

};

module.exports = Command;
