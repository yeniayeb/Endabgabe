"use strict";
var L10_Corona;
(function (L10_Corona) {
    class Cell {
        constructor(_position) {
            this.position = _position;
            this.velocity = new L10_Corona.Vector(0, 0);
        }
        draw() {
           
        }
        move(_timeslice) {
            let offset = new L10_Corona.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    L10_Corona.Cell = Cell;
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Cell.js.map