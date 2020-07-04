"use strict";
var L10_Corona;
(function (L10_Corona) {
    class Antibody extends L10_Corona.Cell {
        constructor(_position) {
            super(_position);
            this.velocity = new L10_Corona.Vector(0, 0);
            this.velocity.random(10, 100);
        }
        draw() {
            L10_Corona.crc2.beginPath();
            L10_Corona.crc2.moveTo(this.position.x, this.position.y);
            L10_Corona.crc2.lineTo(this.position.x + 22, this.position.y - 12);
            L10_Corona.crc2.lineWidth = 3;
            L10_Corona.crc2.strokeStyle = "grey";
            L10_Corona.crc2.stroke();
            L10_Corona.crc2.closePath();
            L10_Corona.crc2.beginPath();
            L10_Corona.crc2.arc(this.position.x + 31, this.position.y - 18, 12, 0.7, 1.4 * Math.PI);
            L10_Corona.crc2.stroke();
            L10_Corona.crc2.closePath();
           
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
    L10_Corona.Antibody = Antibody;
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Antibody.js.map