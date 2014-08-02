var e = require('./element');
var _ = {intersection: require('lodash.intersection')};
var Selector = function (selection) {};

module.exports = function (sel) {

    var selector = sel;

    selector.isSingleNode = function (argument) {
        return sel.anchorNode == sel.focusNode;
    }

    selector.getAnchorElement = function () {
        return firstElement(sel.anchorNode);
    }

    selector.getFocusElement = function () {
        return firstElement(sel.focusNode);
    }
    selector.getCommonAncestor = function () {
        if (!sel.anchorNode) {
            throw new TypeError('Missing anchor node for selection');
        };
        if (sel.isCollapsed || selector.isSingleNode()) {
            var an = sel.anchorNode;
            return e.isTextNode(an) ? an.parentElement : an;
        };

        var common = _.intersection(parents(sel.anchorNode), parents(sel.focusNode));
        return common[0];
    }

    return selector;
}

function parents(node) {
    var nodes = []
    for (; node; node = node.parentNode) {
        nodes.push(node)
    }
    return nodes
}

function firstElement (node) {
    return e.isTextNode(node) ? firstElement(node.parentElement) : node;
}
