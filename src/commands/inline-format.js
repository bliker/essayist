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
    if (nodes.collapsed) return;

    nodes.splitTextOnSelection();

    var created = [];
    var grandPa = nodes.getCommonAncestor();

    nodes.start = tryMoveOut(nodes.start, 'left', grandPa);
    nodes.end = tryMoveOut(nodes.end, 'right', grandPa);

    if (!nodes.areSiblings()) {
        created.concat(wrapStart(nodes, grandPa, nodename));
        created.concat(wrapEnd(nodes, grandPa, nodename));
    }

    // When nodes are swapped it means that start and end were next siblings.
    if (nodes.areSwapped())
        return created;

    if (nodes.areSameNodes() && nodes.start.nodeName.toLowerCase() == nodename) {
        element.dissolve(nodes.start);
        return created;
    }

    created.push(element.wrapUntilOther(nodes.start, nodes.end, nodename));
    return created;
};

function wrapStart (nodes, grandPa, nodename) {
    var created = [];

    // Wrap until we reach a direct descendant of grandPa
    while(nodes.start.parentElement != grandPa) {

        // Firsttry to move out so we can possibly save some time
        nodes.start = tryMoveOut(nodes.start, 'left', grandPa);

        // Check if moving out helped, if not wrap util the end
        if (nodes.start.parentElement != grandPa) {
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

        nodes.end = tryMoveOut(nodes.end, 'right', grandPa);

        if (nodes.end.parentElement != grandPa) {
            var wrapper = element.wrapUntilStart(nodes.end, nodename);
            nodes.end = wrapper.parentElement.previousSibling;
            created.push(wrapper);
        }
    }

    return created;
}

/**
 * Try move cursor outside of current element if it can reduce number of elements
 * that need to be created
 * @example <b>|1</b>2| can be optimized into |<b>1</b>2|
 * @param  {Node}   node
 * @param  {String} direction 'left' or 'right' as a direction where cursor could be moved
 * @param  {Node}   grandPa   common element for selection that is a limit for moving
 */
function tryMoveOut (node, direction, grandPa) {
    var next = (direction == 'left') ? node.previousSibling : node.nextSibling;
    var parent = node.parentElement;

    while(!next && !element.isBlock(parent) && parent != grandPa) {
        node = parent;
        parent = node.parentElement;
    }

    return node;
}
