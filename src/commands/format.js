var PositionNodes = require('../position-nodes');
var element = require('../element');

module.exports = function (selection, nodename) {
    var nodes = new PositionNodes(selection);
    nodes.splitTextOnSelection();
    if (!nodes.areSiblings()) {

        var grandPa = nodes.getCommonAncestor();

        // Wrap elements util they become siblings

        while(nodes.start.parentElement != grandPa) {
            // We can skip wrapping and just jump outside if
            // start is first
            if (!nodes.start.previousSibling) {
                nodes.start = nodes.start.parentElement;
            } else {
                var wrapper = element.wrapUntilEnd(nodes.start, nodename);
                nodes.start = wrapper.parentElement.nextSibling;
            }
        }

        while(nodes.end.parentElement != grandPa) {
            if (!nodes.end.nextSibling) {
                nodes.end = nodes.end.parentElement;
            } else {
                var wrapper = element.wrapUntilStart(nodes.end, nodename);
                nodes.end = wrapper.parentElement.previousSibling;
            }
        }
    }

    element.wrapUntilOther(nodes.start, nodes.end, nodename);
}

function singleNodeFromat (sel, nodename) {
    var nodes = sel.getPositionNodes();

    var text, el, html;
    text = sel.anchorNode.textContent;
    el = document.createElement(nodename);
    el.textContent = text.substring(nodes.startOffset, nodes.endOffset);

    html = text.substring(0, nodes.startOffset - 1) + el.outerHTML + text.substring(nodes.endOffset + 1);
    sel.getAnchorElement().innerHTML = html;
}