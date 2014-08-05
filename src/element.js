exports.isTextNode = function (node) {
    return node.nodeType === node.TEXT_NODE;
}

exports.isLastChild = function (node) {
    return !node.nextSibling
}

exports.firstElement = function (node) {
    return exports.isTextNode(node) ? exports.firstElement(node.parentElement) : node;
}

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
    return element;
}

exports.wrapUntilStart = function (startNode, newElementName) {
    var element = document.createElement(newElementName);
    var node;

    while((node = startNode.parentElement.firstChild) != startNode) {
        element.appendChild(node);
    }

    element.appendChild(startNode.cloneNode(true));
    startNode.parentElement.replaceChild(element, startNode);
    return element;
}

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
    return element;
}