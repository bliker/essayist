var insert = require('../src/commands/insert-html.js');

describe('Insert html command', function () {

    beforeEach(function () { createHost(); });
    afterEach(function () { destroyHost(); });

    describe('collapsed selection', function () {
        it('on start of text node', function () {
            givenContent('<p>|1</p>');
            insert(selection(), document.createElement('b'));
            expectContent().toBe('<p><b></b>1</p>');
        });

        it('on end of text node', function () {
            givenContent('<p>1|</p>');
            insert(selection(), document.createElement('b'));
            expectContent().toBe('<p>1<b></b></p>');
        });

        it('in middle of node', function () {
            givenContent('<p>1|2</p>');
            insert(selection(), document.createElement('b'));
            expectContent().toBe('<p>1<b></b>2</p>');
        });
    });

    it('in sibling nodes', function () {
        givenContent('<p>1|2|3</p>');
        insert(selection(), document.createElement('b'));
        expectContent().toBe('<p>1<b></b>3</p>');
    });

    it('in non sibling nodes', function () {
        givenContent('<p><i>1|2</i>3|4</p>');
        insert(selection(), document.createElement('b'));
        expectContent().toBe('<p><i>1</i><b></b>4</p>');

        givenContent('<p><i>1|2</i>3<i>4|5</i></p>');
        insert(selection(), document.createElement('b'));
        expectContent().toBe('<p><i>1</i><b></b><i>5</i></p>');
    });

    // Ignoring this for now, b/c I am lazy
    xit('in non sibling nodes that are next to each other', function () {
        givenContent('<p><i>1|2</i><i>4|5</i></p>');
        insert(selection(), document.createElement('b'));
        expectContent().toBe('<p><i>1</i><b></b><i>5</i></p>');
    });
});
