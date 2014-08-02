var selector = require('../selector');
var element = require('../element');

module.exports = function (selection, nodename) {
    var sel = selector(selection);
    if (sel.isCollapsed) { throw "WHAT WHAT WHAT"; };
    if (sel.isSingleNode()) {
        singleNodeFromat(sel, nodename);
    };
}

function singleNodeFromat(sel, nodename) {
    var start, end;
    if (sel.anchorOffset > sel.focusOffset) {
        start = sel.anchorOffset;
        end = sel.focusOffset;
    } else {
        end = sel.anchorOffset;
        start = sel.focusOffset;
    }

    var text = sel.anchorNode.textContent;
    var el = document.createElement(nodename);
    el.textContent = text.substring(start, end);

    var html = text.substring(0, start - 1) + el.outerHTML + text.substring(end + 1);
    sel.getAnchorElement().innerHTML = html;
}