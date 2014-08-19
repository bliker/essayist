exports.get = function () {
    var sel = window.getSelection();
    return sel.type == 'None' ? null : sel;
};

exports.save = function () {
    // Not implemented
};

exports.restore = function () {
    // Not implemented
};

exports.forget = function () {
    // Not implemented
};
