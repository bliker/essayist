var selection = require('./selection');

module.exports = function (emit) {
    var commands = {actual: {}};

    /**
     * Bind new command
     * @param {Command|Array} cmd
     */
    commands.add = function (cmd) {
        var all = Array.isArray(cmd) ? cmd : [cmd];

        for (var i = 0; i < all.length; i++) {
            var current = all[i];

            commands.actual[current.name] = current;
            current.init();
        }
    };

    /**
     * Execute command with specified name
     * @param  {String} name
     */
    commands.execute = function (name) {
        var cmd = commands.actual[name];
        if (!cmd) throw new Error('Command with name: ' + name + ' does not exist.');

        var sel = selection.get();
        if (!sel) {
            console.warn('Missing selection');
            return false;
        }

        cmd.execute(sel);
        emit('command.' + name);
    };

    /**
     * Remove command or commands
     * @param  {String} name
     */
    commands.remove = function (name) {
        var cmd = commands.actual[name];
        if (!cmd) throw new Error('Command with name: ' + name + ' does not exist.');

        console.log('remove');
    };

    // Add default commands

    commands.add([
        require('./commands/strong'),
        require('./commands/ul')
    ]);

    return commands;
};
