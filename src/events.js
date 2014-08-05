module.exports = function (essayist) {
    var elementEvents = {

        blur: function () {

            propagate('blur');
        },

        focus: function () {

            propagate('focus');
        }

    }

    // Bind all events to the element
    for(event in elementEvents) {
        essayist.on(event, elementEvents[event]);
    }

    /**
     * Execute following event on main editor element too
     */
    function propagate (name, payload) {
        payload = payload || [];
        payload.unshift(name);

        essayist.emit.call(essayist, payload);
    }
}