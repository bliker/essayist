var manager = require('../src/undo-manager');

describe('Undo manager', function () {
    beforeEach(function () {
        manager.reset();
    })

    it('store snapped values', function () {
        manager.snap(1);
        manager.snap(2);
        expect(manager.storage).toEqual([1, 2]);
    });

    describe('should check if it can', function () {
        it('undo if empty', function () {
            expect(manager.canUndo()).toBeFalsy();
        });

        it('undo if non empty', function () {
            manager.position = 0;
            expect(manager.canUndo()).toBeTruthy();
        });
    })

    describe('should return move across history correctly', function () {
        beforeEach(function () {
            manager.storage = [1, 2, 3];
        });

        it('should go back', function () {
            manager.position = 2;
            expect(manager.undo()).toEqual(3);
            expect(manager.undo()).toEqual(2);
            expect(manager.undo()).toEqual(1);
        });

        it('and there again', function () {
            manager.position = 0;
            expect(manager.redo()).toEqual(1);
            expect(manager.redo()).toEqual(2);
            expect(manager.redo()).toEqual(3);
        });

        it('remove stuff when doing snapping', function () {
            manager.position = 0;
            manager.snap(9);
            expect(manager.storage).toEqual([1, 9])
        });
    });
});