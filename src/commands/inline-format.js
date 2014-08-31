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
        created.concat(wrapStartNode(nodes, grandPa, nodename));
        created.concat(wrapEndNode(nodes, grandPa, nodename));
    }

    // When nodes are swapped it means that start and end were next siblings.
    if (nodes.areSwapped())
        return created;

    // When nodes are same, means we are only going to do removing
    if (nodes.areSameNodes() && nodes.start.nodeName.toLowerCase() == nodename) {
        element.dissolve(nodes.start);
        return created;
    }

    created.push(wrapUntilOther(nodes.start, nodes.end, nodename));
    return created;
};

function wrapStartNode (nodes, grandPa, nodename) {
    var created = [];

    // Wrap until we reach a direct descendant of grandPa
    while(nodes.start.parentElement != grandPa) {

        // First try to move out so we can possibly save some time
        nodes.start = tryMoveOut(nodes.start, 'left', grandPa);

        // Check if moving out helped, if not wrap util the end
        if (nodes.start.parentElement != grandPa) {
            var wrapper = wrapUntilEnd(nodes.start, nodename);
            nodes.start = wrapper.parentElement.nextSibling;
            created.push(wrapper);
        }
    }

    return created;
}

function wrapEndNode (nodes, grandPa, nodename) {
    var created = [];

    while(nodes.end.parentElement != grandPa) {

        nodes.end = tryMoveOut(nodes.end, 'right', grandPa);

        if (nodes.end.parentElement != grandPa) {
            var wrapper = wrapUntilStart(nodes.end, nodename);
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

/**
 * Wrap all siblings following (and including) startNode in element
 * @param  {Node}    startNode
 * @param  {String} newElementName
 * @return {Array}  Created elements
 */
 function wrapUntilEnd (startNode, newElementName) {
    var el = document.createElement(newElementName);
    var startIndex = element.index(startNode);

    var frag = element.splice(startNode.parentElement, startIndex, Number.MAX_SAFE_INTEGER, el);
    el.appendChild(frag);

    element.dissolveChildrenWithTagName(el, newElementName);
    return el;
}

/**
 * Wrap all siblings preceeding (and including) startNode in element
 * @param  {Node}    startNode
 * @param  {String} newElementName
 * @return {Array}  Created elements
 */
function wrapUntilStart (startNode, newElementName) {
    var el = document.createElement(newElementName);
    var startIndex = element.index(startNode);

    var frag = element.splice(startNode.parentElement, 0, startIndex+1, el);
    el.appendChild(frag);

    element.dissolveChildrenWithTagName(el, newElementName);
    return el;
}

/**
 * Wrap all siblings between (and including) startNode and endNode in element
 * @param  {Node} startNode
 * @param  {Node} endNode
 * @param  {String} newElementName
 * @return {Array}  Created elements
 */
function wrapUntilOther (startNode, endNode, newElementName) {
    var el = document.createElement(newElementName);
    var startIndex = element.index(startNode);
    var endIndex = element.index(endNode);

    if (startIndex == endIndex) {
        el.appendChild(startNode.cloneNode(true));
        startNode.parentElement.replaceChild(el, startNode);
    } else {
        var frag = element.splice(startNode.parentElement, startIndex, endIndex - startIndex + 1, el);
        el.appendChild(frag);

        element.dissolveChildrenWithTagName(el, newElementName);
    }
    return el;
}

/**
 * Wrap all chlidren into inline element, could turn recrusive
 * @param  {Element} el
 * @param  {String} newElementName
 * @return {Array}  Created elements
 */
function wrapChildren (parent, newElementName) {
    var el = document.createElement(newElementName);
    var created = [];
    Array.prototype.forEach.call(parent.childNodes, function (n) {
        if (element.isBlock(n))
            created.join(wrapChildren(n, newElementName));

        el.appendChild(n);
    });

    parent.appendChild(el);
    created.push(el);

    return created;
}
