function createHost () {
    var host = document.createElement('div');
    host.setAttribute('class', 'test-editor');
    document.body.insertBefore(host, document.body.firstChild)
}

function getHost () {
    return document.querySelector('.test-editor');
}

function destroyHost () {
    var c = getHost();
    c.parentElement.removeChild(c);
}

function selection () {
    return window.getSelection();
}


function givenContent(html) {
    element = getHost();
    element.innerHTML = html.replace(/\|/g, '<em class="bookmark"></em>');

    var bookmarkNodes = element.querySelectorAll('em.bookmark');

    if (bookmarkNodes.length) {
        var range = document.createRange();

        range.setStartBefore(bookmarkNodes[0]);
        if (bookmarkNodes.length >= 2) {
            range.setEndAfter(bookmarkNodes[1]);
        }

        Array.prototype.forEach.call(bookmarkNodes, function (bookmarkNode) {
            var parent = bookmarkNode.parentNode;
            parent.removeChild(bookmarkNode);
            // Merges text nodes and removed empty ones
            parent.normalize();
        });

        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function expectContent () {
    return expect(getHost().innerHTML);
}