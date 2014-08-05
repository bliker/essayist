var format = require('../src/commands/format');

describe('Format command', function () {
    describe('Fromatting span elements', function () {
        beforeEach(function () {
            createHost();
        });

        it('should correctly format simple selection', function () {
            givenContent('<p>x|1|x</p>');
            format(selection(), 'b');
            expectContent().toBe('<p>x<b>1</b>x</p>');
        });

        it('should correctly format selection spaning whole text node', function () {
            givenContent('<p>|1|</p>');
            format(selection(), 'b');
            expectContent().toBe('<p><b>1</b></p>');
        });

        it('should correctly format selection across element', function () {
            givenContent('<p>0|1<i>2</i>3|4</p>');
            format(selection(), 'b');
            expectContent().toBe('<p>0<b>1<i>2</i>3</b>4</p>');
        });

        it('should correctly format selection from element to parent', function () {
            givenContent('<p><i>1|2</i>3|4</p>');
            format(selection(), 'b');
            expectContent().toBe('<p><i>1<b>2</b></i><b>3</b>4</p>');
        });

        it('should correctly format selection from element to element that is not sibling', function () {
            givenContent('<p><i>1|2</i>3<i>4|5</i></p>');
            format(selection(), 'b');
            expectContent().toBe('<p><i>1<b>2</b></i><b>3</b><i><b>4</b>5</i></p>');
        });

        it('should correctly format selection that starts at the start of element', function () {
            givenContent('<p><i>|12</i>3|4</p>');
            format(selection(), 'b');
            expectContent().toBe('<p><b><i>12</i>3</b>4</p>');
        });

        afterEach(function () {
            destroyHost();
        });
    });
});