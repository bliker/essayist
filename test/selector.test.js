// var sel = require('../src/selector.js');

describe('Selector fuction', function () {
    beforeEach(function () {
        createHost();
    });
    // describe('getCommonAncestor helper function', function () {
    //     it('on collapsed selection', function () {
    //         givenContent('<p>x|</p>');
    //         expect(sel(selection()).getCommonAncestor().nodeName).toBe('P');
    //     });

    //     it('on selection that spans only one element', function () {
    //         givenContent('<p>|x|</p>');
    //         expect(sel(selection()).getCommonAncestor().nodeName).toBe('P');
    //     });

    //     it('on selection that starts in element but ends in parent', function () {
    //         givenContent('<p>|1<b>2|</b></p>');
    //         expect(sel(selection()).getCommonAncestor().nodeName).toBe('P');
    //     });

    //     it('on selection that spans two different elements', function () {
    //         givenContent('<p><i>|1</i><b>2|</b></p>');
    //         expect(sel(selection()).getCommonAncestor().nodeName).toBe('P');
    //     });
    // });

    afterEach(function () {
        destroyHost();
    });
})