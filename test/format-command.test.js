var format = require('../src/commands/format');
var selector = require('../src/selector');

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

        afterEach(function () {
            destroyHost();
        });
    });
});