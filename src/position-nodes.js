var _ = {intersection: require('lodash.intersection')};
var element = require('./element');

var PositionNodes = function (sel) {
    var self = this;

    if (!sel.anchorNode || !sel.focusNode)
        throw new TypeError('Selection is missing focus or anchor nodes');

    if (sel.anchorNode == sel.focusNode) {
        withinSingleNode(this, sel);
    } else if (sel.anchorNode.compareDocumentPosition(sel.focusNode) == 4) {
        makeForwardSelection();
    } else {
        makeBackwardSelection();
    }

    function withinSingleNode () {
        if (sel.anchorOffset < sel.focusOffset) {
            makeForwardSelection();
        } else {
            makeBackwardSelection();
        }
    }

    function makeForwardSelection () {
        makeNode('start', 'anchor');
        makeNode('end', 'focus');
    }

    function makeBackwardSelection () {
        makeNode('start', 'focus');
        makeNode('end', 'anchor');
    }

    function makeNode (position, name) {
        self[position] = sel[name + 'Node'];
        self[position + 'Offset'] = sel[name + 'Offset'];
    }
}

/**
 * Subdivides the text nodes into smaller ones on
 * places where selection starts or ends
 */
PositionNodes.prototype.splitTextOnSelection = function() {

    if (this.areSameNodes()) {
        var splitStart = Boolean(this.startOffset);
        var splitEnd = this.endOffset < this.end.length;

        // Splitting is hard, there are three ways we do splitting if
        // they are in same node:
        if (splitStart && splitEnd) {
            // When a|b|c
            this.end.splitText(this.endOffset);
            this.start = this.end = this.start.splitText(this.startOffset);
            this.startOffset = 0;
            this.endOffset = this.end.length;
        } else if (splitStart && !splitEnd) {
            // When a|b|
            this.start = this.end = this.start.splitText(this.startOffset);
            this.startOffset = 0;
        } else if (!splitStart && splitEnd) {
            // When |b|c
            this.end = this.start;
            this.endOffset = this.start.length;
        }
    } else {
        if (this.startOffset) {
            this.start = this.start.splitText(this.startOffset);
            this.startOffset = 0;
        };

        if (this.endOffset < this.end.length) {
            this.end.splitText(this.endOffset);
            this.endOffset = 0;
        }
    }

};

PositionNodes.prototype.areSiblings = function () {
    return this.start.parentElement == this.end.parentElement
}

PositionNodes.prototype.areSameNodes = function () {
    return this.start == this.end;
}

PositionNodes.prototype.getCommonAncestor = function () {
    var common = _.intersection(
        parents(this.start),
        parents(this.end)
    );
    return common[0];
}

function parents(node) {
    var nodes = []
    for (; node; node = node.parentNode) {
        nodes.push(node)
    }
    return nodes
}


module.exports = PositionNodes;