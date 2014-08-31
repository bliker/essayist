var e = require('../src/element');

describe('Element helper', function () {

    beforeEach(function () { createHost(); });
    afterEach(function () { destroyHost(); });

    describe('Splice', function () {
        it('positive direction', function () {
            givenContent('<b>1</b>2<b>3</b>');
            e.splice(getHost(), 0, 1);
            expectContent().toBe('2<b>3</b>');

            givenContent('<b>1</b>2<b>3</b>');
            e.splice(getHost(), 1, 1);
            expectContent().toBe('<b>1</b><b>3</b>');
        });

        it('until end', function () {
            givenContent('<b>1</b>2<b>3</b>');
            e.splice(getHost(), 1, 2);
            expectContent().toBe('<b>1</b>');
        });

        it('without howMany', function () {
            givenContent('<b>1</b>2<b>3</b>');
            e.splice(getHost(), 1, 0);
            expectContent().toBe('<b>1</b>2<b>3</b>');
        });

        it('excessive numbers', function () {
            givenContent('<b>1</b>2<b>3</b>');
            e.splice(getHost(), 1, 300);
            expectContent().toBe('<b>1</b>');
        });

        describe('appending elements is positive direction', function () {
            it('in middle', function () {
                givenContent('<b>1</b>2<b>3</b>');
                e.splice(getHost(), 1, 1, document.createElement('i'));
                expectContent().toBe('<b>1</b><i></i><b>3</b>');
            });

            it('with exessive howMany', function () {
                givenContent('<b>1</b>');
                e.splice(getHost(), 1, 300, document.createElement('i'));
                expectContent().toBe('<b>1</b><i></i>');
            });
        });
    });

    it('finding element index', function () {
        givenContent('<b>1</b>2<b>3</b>');
        expect(e.index(getHost().childNodes[2])).toBe(2);
    });
});
