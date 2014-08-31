var selection = require('./selection');
var _ = {assign: require('lodash.assign')};

module.exports = function (props) {
    var commands = {actual: {}};

    /**
     * @param {Command|Array} cmd
     */
    commands.add = function (cmd) {
        var all = Array.isArray(cmd) ? cmd : [cmd];

        for (var i = 0; i < all.length; i++) {
            var current = all[i];
            if (commands.actual[current.name])
                throw new Error('Command with name: ' + current.name + ' already exists.');

            commands.actual[current.name] = current;
            _.assign(current.essayist, props);
            current.init();
        }
    };

    /**
     * Execute command with specified name
     * @param  {String} name
     * @return {Bool}   Status of command execution
     */
    commands.execute = function (name) {
        var cmd = commands.actual[name];
        if (!cmd) throw new Error('Command with name: ' + name + ' does not exist.');

        var sel = selection.get();
        if (!sel) {
            cmd.essayist.bell('Missing selection');
            return;
        }

        cmd.execute(sel);
        cmd.essayist.emit('command.' + cmd.name);
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

    commands.list = function () {
        return Object.keys(commands.actual);
    };

    // Add default commands

    commands.add([
        require('./commands/strong'),
        require('./commands/em'),
        require('./commands/strike'),
        require('./commands/link'),
        require('./commands/ul'),
        require('./commands/ol')
    ]);

    return commands;
};
