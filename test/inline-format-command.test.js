var format = require('../src/commands/inline-format');

describe('Fromatting inline elements with selection', function () {
    beforeEach(function () { createHost(); });
    afterEach(function () { destroyHost(); });

    it('inside one text node', function () {
        givenContent('<p>1|2|3</p>');
        format(selection(), 'b');
        expectContent().toBe('<p>1<b>2</b>3</p>');
    });

    it('spaning whole text node', function () {
        givenContent('<p>|1|</p>');
        format(selection(), 'b');
        expectContent().toBe('<p><b>1</b></p>');
    });

    it('across inline element', function () {
        givenContent('<p>0|1<i>2</i>3|4</p>');
        format(selection(), 'b');
        expectContent().toBe('<p>0<b>1<i>2</i>3</b>4</p>');
    });

    it('across block element', function () {
        givenContent('0|1<p>2</p>3|4');
        format(selection(), 'b');
        expectContent().toBe('0<b>1</b><p><b>2</b></p><b>3</b>4');
    });

    it('across same element', function () {
        givenContent('0|1<b>2</b>3|4');
        format(selection(), 'b');
        expectContent().toBe('0<b>123</b>4');
    });

    it('in same element', function () {
        givenContent('1<b>|2|</b>3');
        format(selection(), 'b');
        expectContent().toBe('123');
    });

    it('from el to parent', function () {
        givenContent('<p><i>1|2</i>3|4</p>');
        format(selection(), 'b');
        expectContent().toBe('<p><i>1<b>2</b></i><b>3</b>4</p>');
    });

    it('from start of el to parent, should bubble out', function () {
        givenContent('<p><i>|12</i>3|4</p>');
        format(selection(), 'b');
        expectContent().toBe('<p><b><i>12</i>3</b>4</p>');
    });

    it('from el to el that is not sibling', function () {
        givenContent('<p><i>1|2</i>3<i>4|5</i></p>');
        format(selection(), 'b');
        expectContent().toBe('<p><i>1<b>2</b></i><b>3</b><i><b>4</b>5</i></p>');
    });

    it('that starts at the start of el', function () {
        givenContent('<p><i>|12</i>3|4</p>');
        format(selection(), 'b');
        expectContent().toBe('<p><b><i>12</i>3</b>4</p>');
    });

    it('that starts at the start of block el', function () {
        givenContent('<p>|1</p><p>2|</p>');
        format(selection(), 'b');
        expectContent().toBe('<p><b>1</b></p><p><b>2</b></p>');
    });

    it('that starts that spans across two block elements', function () {
        givenContent('<p>|1</p><p>2|</p>');
        format(selection(), 'b');
        expectContent().toBe('<p><b>1</b></p><p><b>2</b></p>');
    });

});
