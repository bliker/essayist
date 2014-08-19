var PositionNodes = require('../position-nodes');
var element = require('../element');

/**
 * Takes care for formatting (wrapping) of inline elements.
 * @param  {Selection} selection Current selection
 * @param  {String}    nodename  Name of element that will wrap the selection
 * @return {Array}               Array of all newly created elements
 */
module.exports = function (selection, nodename) {
    var nodes = new PositionNodes(selection);
    if (nodes.collapsed)
        return;

    nodes.splitTextOnSelection();

    var created = [];

    if (!nodes.areSiblings()) {

        var grandPa = nodes.getCommonAncestor();

        // Wrap elements util they become siblings
        created.concat(wrapStart(nodes, grandPa, nodename));
        created.concat(wrapEnd(nodes, grandPa, nodename));
    }

    // When nodes are swapped it means that start and end were next siblings.
    if (nodes.areSwapped())
        return created;

    created.push(element.wrapUntilOther(nodes.start, nodes.end, nodename));
    return created;
};

function wrapStart (nodes, grandPa, nodename) {
    var created = [];

    while(nodes.start.parentElement != grandPa) {
        // We can skip wrapping and just jump outside if
        // start is first or end last, but only if parent is not block
        if (!nodes.start.previousSibling &&
            !element.isBlock(nodes.start.parentElement) &&
            nodes.start.parentElement != grandPa
        ) {
            nodes.start = nodes.start.parentElement;
        } else {
            var wrapper = element.wrapUntilEnd(nodes.start, nodename);
            nodes.start = wrapper.parentElement.nextSibling;
            created.push(wrapper);
        }
    }

    return created;
}

function wrapEnd (nodes, grandPa, nodename) {
    var created = [];

    while(nodes.end.parentElement != grandPa) {
        if (!nodes.end.nextSibling &&
            !element.isBlock(nodes.start.parentElement) &&
            nodes.start.parentElement != grandPa
        ) {
            nodes.end = nodes.end.parentElement;
        } else {
            var wrapper = element.wrapUntilStart(nodes.end, nodename);
            nodes.end = wrapper.parentElement.previousSibling;
            created.push(wrapper);
        }
    }

    return created;

}
