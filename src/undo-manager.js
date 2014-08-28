var UndoManager = {
    storage: [],
    position: -1,
    firstUndo: true,
    truncate: true,

    canUndo: function () {
        return this.position !== -1;
    },

    canRedo: function () {
        return this.position !== this.storage.length;
    },

    undo: function () {
        if (!this.canUndo()) return false;

        if (!this.firstUndo) this.position--;
        this.firstUndo = false;
        return this.storage[this.position];
    },

    redo: function () {
        if (!this.canRedo()) return false;

        this.firstUndo = true;
        return this.storage[this.position++];
    },

    snap: function (data) {
        if (this.position !== this.storage.length - 1) {
            this.storage.splice(this.position + 1, 9999);
        }

        if (this.truncate && data && data == this.storage[this.position]) {
            return false;
        }

        this.storage[this.position + 1] = data;
        this.position = this.storage.length - 1;

        return true;
    },

    reset: function () {
        this.firstUndo = true;
        this.position = -1;
        this.storage = [];
    },
};

Object.seal(UndoManager);
module.exports = UndoManager;
