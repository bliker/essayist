/**
 *
 * General useful helpers for working with elements
 */

exports.BLOCK_ELEMENTS = ['address', 'article', 'aside', 'audio', 'blockquote',
'canvas', 'dd', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'figcaption',
'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr',
'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table', 'tfoot', 'ul',
'video'];

exports.isTextNode = function (node) {
    return node.nodeType === node.TEXT_NODE;
};

exports.isBlock = function (el) {
    if (typeof el != 'string') el = el.nodeName;
    return exports.BLOCK_ELEMENTS.indexOf(el.toLowerCase()) > -1;
};

exports.isLastChild = function (node) {
    return !node.nextSibling;
};

exports.isFirstChild = function (node) {
    return !node.previousSibling;
};

exports.index = function (el) {
    return Array.prototype.indexOf.call(el.parentNode.childNodes, el);
};

exports.makeFragment = function (html) {
    var tempEl = document.createElement('div');
    tempEl.innerHTML = html;

    return exports.copyChildrenIntoFragment(tempEl);
};

exports.makeElementFromFragment = function (nodename, frag) {
    return document.createElement(nodename).appendChild(frag);
};

exports.copyChildrenIntoFragment = function (el) {
    var frag = document.createDocumentFragment();

    Array.prototype.forEach.call(el.childNodes, function (e) {
        frag.appendChild(e);
    });

    return frag;
};

exports.dissolveChildrenWithTagName = function (node, name) {
    Array.prototype.forEach.call(node.getElementsByTagName(name), function (el) {
        exports.dissolve(el);
    });
};

/**
 * Replace element with its children
 * @param  {Element} el
 */
exports.dissolve = function  (el) {
    var frag = exports.copyChildrenIntoFragment(el);
    var parent = el.parentElement;
    parent.replaceChild(frag, el);
    parent.normalize();
};

/**
 * Replace all content from start node to end node with dom
 * I cannot come up with better name
 */
exports.replaceUntilOther = function (startNode, endNode, dom) {
    if (startNode != endNode) {
        while((node = startNode.nextSibling) != endNode) {
            if (!node) throw new Error('Cannot reach end node!');
            element.parentElement.removeChild(node);
        }
    }

    startNode.parentElement.replaceChild(dom, startNode);
};

/**
 * Remove all nodes following and including the startNode
 */
exports.removeSiblingsFollowing = function (startNode) {
    var node;
    while(node = startNode.nextSibling) {
        element.parentElement.removeChild(node);
    }
    startNode.parentElement.removeChild(startNode);

    return startNode;
};

exports.removeSiblingsBefore = function (endNode) {
    var node;
    while(node = endNode.previousSibling) {
        element.parentElement.removeChild(node);
    }
    endNode.parentElement.removeChild(endNode);

    return endNode;
};

exports.removeChildren = function (el) {
    Array.prototype.forEach.call(el.childNodes, function (e) {
        el.removeChild(e);
    });

    return el;
};

/**
 * Splice childNodes of element
 * @param  {Element} el      Element to modify
 * @param  {Integer} index   Where to start
 * @param  {Integer} howMany Number of old items to remove
 * @param  {Node}    ...     Elements to add
 * @return {Fragment}        List of removed elements
 */
exports.splice = function (el, index, howMany) {
    var frag = document.createDocumentFragment();

    // Reduce all Nodes to one fragment that can be easily appended
    var nodesToAdd = Array.prototype.splice.call(arguments, 3, Number.MAX_SAFE_INTEGER);
    nodesToAdd = nodesToAdd.reduce(function (previous, current) {
        previous.appendChild(current);
        return previous;
    }, document.createDocumentFragment());

    // Figure out out if ending is execessive
    var end = index + howMany;
    end = end > el.childNodes.length ? el.childNodes.length : end;

    // We first append necessary nodes
    if (nodesToAdd.childNodes.length) {
        if (el.childNodes[end]) {
            el.insertBefore(nodesToAdd, el.childNodes[end]);
        } else {
            el.appendChild(nodesToAdd);
        }
    }

    // Append each node to fragment until we reach end index
    var i = index;
    while(i < end) {
        frag.appendChild(el.childNodes[index]);
        i++;
    }

    return frag;
};
