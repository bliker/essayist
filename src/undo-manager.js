module.exports = {
    storage: [],
    position: -1,
    firstUndo: true,

    undo: function () {
        if (!this.firstUndo) this.position--;
        this.firstUndo = false;
        return this.storage[this.position];
    },

    redo: function () {
        this.firstUndo = true;
        return this.storage[this.position++];
    },

    snap: function (data) {
        if (this.position !== this.storage.length - 1) {
            this.storage.splice(this.position + 1, 9999);
        };
        this.storage[this.position + 1] = data;
        this.position = this.storage.length - 1;

    },

    reset: function () {
        this.firstUndo = true;
        this.storage = []
    },
}