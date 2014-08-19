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

exports.isBlock = function (element) {
    if (typeof element != 'string') element = element.nodeName;
    return exports.BLOCK_ELEMENTS.indexOf(element.toLowerCase()) > -1;
};

exports.isLastChild = function (node) {
    return !node.nextSibling;
};

exports.isFirstChild = function (node) {
    return !node.previousSibling;
};

exports.makeFragment = function (html) {
    var tempEl = document.createElement('div');
    tempEl.innerHTML = html;

    return exports.copyChildrenIntoFragment(tempEl);
};

exports.copyChildrenIntoFragment = function (el) {
    var frag = document.createDocumentFragment();

    Array.prototype.forEach.call(el.childNodes, function (e) {
        frag.appendChild(e);
    });

    return frag;
};

exports.replaceChildrenWithTagName = function (node, name) {
    Array.prototype.forEach.call(node.getElementsByTagName(name), function (e) {
        var frag = exports.copyChildrenIntoFragment(e);
        var parent = e.parentElement;
        parent.replaceChild(frag, e);
        parent.normalize();
    });
};

/**
 * Wrap conent of elements form startNode to end of element with
 * element with newElementName
 * @return {Element} Newly created element
 */
exports.wrapUntilEnd = function (startNode, newElementName) {
    var element = document.createElement(newElementName);
    var node;

    element.appendChild(startNode.cloneNode(true));
    while(node = startNode.nextSibling) {
        element.appendChild(node);
    }

    startNode.parentElement.replaceChild(element, startNode);

    exports.replaceChildrenWithTagName(element, newElementName);
    return element;
};

exports.wrapUntilStart = function (startNode, newElementName) {
    var element = document.createElement(newElementName);
    var node;

    while((node = startNode.parentElement.firstChild) != startNode) {
        element.appendChild(node);
    }

    element.appendChild(startNode.cloneNode(true));
    startNode.parentElement.replaceChild(element, startNode);

    exports.replaceChildrenWithTagName(element, newElementName);
    return element;
};

exports.wrapUntilOther = function (startNode, endNode, newElementName) {
    var element = document.createElement(newElementName);
    var node;

    element.appendChild(startNode.cloneNode(true));
    if (startNode != endNode) {
        while((node = startNode.nextSibling) != endNode) {
            if (!node) throw 'Cannot reach end node!';
            element.appendChild(node);
        }
        element.appendChild(endNode);
    }

    startNode.parentElement.replaceChild(element, startNode);
    exports.replaceChildrenWithTagName(element, newElementName);
    return element;
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
};

exports.removeSiblingsBefore = function (endNode) {
    var node;
    while(node = endNode.previousSibling) {
        element.parentElement.removeChild(node);
    }
    endNode.parentElement.removeChild(endNode);
};
