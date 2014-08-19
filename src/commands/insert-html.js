var element = require('../element');
var PositionNodes = require('../position-nodes');

module.exports = function (selection, dom) {

    var nodes = new PositionNodes(selection);
    nodes.splitTextOnSelection();

    if (selection.isCollapsed) {
        forCollapsed(nodes, dom);
    } else {
        forSelection(nodes, dom);
    }
};



/**
 * Caret can only be on the end or start after splitting, we have to do this
 * funky magic to append element after or before selection node
 * @param  {PositionNodes}    nodes
 * @param  {DocumentFragment} dom
 */
function forCollapsed (nodes, dom) {
    if (nodes.startOffset) {
        if (element.isLastChild(nodes.start))
            nodes.start.parentElement.appendChild(dom);
        else
            nodes.start.parentElement.insertBefore(dom, nodes.start.nextSibling);
    } else {
        nodes.start.parentElement.insertBefore(dom, nodes.start);
    }
}

/**
 * When selection is not collapsed we have to do more complex removing
 * @param  {PositionNodes}    nodes
 * @param  {DocumentFragment} dom
 */
function forSelection(nodes, dom) {
    if (!nodes.areSiblings()) {
        var grandPa = nodes.getCommonAncestor();
        while(nodes.start.parentElement != grandPa) {
            var next = nodes.start.parentElement.nextSibling;
            element.removeSiblingsFollowing(nodes.start);
            nodes.start = next;
        }

        while(nodes.end.parentElement != grandPa) {
            var next = nodes.end.parentElement.previousSibling;
            element.removeSiblingsBefore(nodes.end);
            nodes.end = next;
        }

    }

    element.replaceUntilOther(nodes.start, nodes.end, dom);
}
