var e = require('../src/element');

function htmlOf (html) {
    var host = document.createElement('div');
    host.innerHTML = html;
    return host.firstChild;
}

describe('Element helper', function () {
    describe('Wrapping until end of element', function () {
        it('that has only one element', function () {
            var node = htmlOf('<i>1</i>').firstChild;
            var result = e.wrapUntilEnd(node, 'b').parentElement.outerHTML;
            expect(result).toBe('<i><b>1</b></i>');
        });

        it('that has many elements', function () {
            var node = htmlOf('<i>1234</i>').firstChild.splitText(2);
            var result = e.wrapUntilEnd(node, 'b').parentElement.outerHTML;
            expect(result).toBe('<i>12<b>34</b></i>');
        });
    });

    describe('Wraping until other node', function () {
        it('that contains 1 node', function () {
            var node = htmlOf('<i>123</i>').firstChild.splitText(1).splitText(1).parentElement;
            var result = e.wrapUntilOther(node.firstChild, node.lastChild, 'b').parentElement.outerHTML;
            expect(result).toBe('<i><b>123</b></i>');
        });

        it('that contains multiple nodes', function () {
            var node = htmlOf('<i>12345678</i>').firstChild.splitText(2).splitText(2).splitText(2).parentElement;
            var result = e.wrapUntilOther(node.childNodes[1], node.childNodes[2], 'b').parentElement.outerHTML;
            expect(result).toBe('<i>12<b>3456</b>78</i>');
        });
    });
});