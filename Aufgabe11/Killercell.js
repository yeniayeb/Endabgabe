"use strict";
var L10_Corona;
(function (L10_Corona) {
    class Killercell extends L10_Corona.Cell {
        constructor(_position) {
            super(_position);
            this.velocity = new L10_Corona.Vector(0, 0);
            this.velocity.random(10, 100);
        }
        draw() {
            let radiusK = 20;
            L10_Corona.crc2.beginPath();
            L10_Corona.crc2.moveTo(this.position.x, this.position.y);
            L10_Corona.crc2.arc(this.position.x + 20, this.position.y + 20, radiusK, 0.2 * Math.PI, 1.8 * Math.PI, false);
            L10_Corona.crc2.lineTo(this.position.x + 20, this.position.y + 20);
            L10_Corona.crc2.closePath();
            L10_Corona.crc2.fillStyle = "black";
            L10_Corona.crc2.strokeStyle = "white";
            L10_Corona.crc2.fill();
            L10_Corona.crc2.stroke();
            L10_Corona.crc2.save();
        }
        move(_timeslice) {
            super.move(_timeslice);
            if (this.position.x < 0)
                this.position.x += L10_Corona.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L10_Corona.crc2.canvas.height;
            if (this.position.x > L10_Corona.crc2.canvas.width)
                this.position.x -= L10_Corona.crc2.canvas.width;
            if (this.position.y > L10_Corona.crc2.canvas.height)
                this.position.y -= L10_Corona.crc2.canvas.height;
        }
    }
    L10_Corona.Killercell = Killercell;
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Killercell.js.map