module.exports = function (emit, el) {

    el.addEventListener('blur', function (e) {
        emit('blur', e);
    });

    el.addEventListener('focus', function (e) {
        emit('focus', e);
    });

    el.addEventListener('input', function (e) {
        emit('input', e);
    });

    el.addEventListener('keypress', function (e) {
        e = e || window.event;
        var charCode = e.which || e.keyCode;

        emit('keypress', e, String.fromCharCode(charCode));
    });
}