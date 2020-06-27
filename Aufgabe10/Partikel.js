"use strict";
var Canvas3;
(function (Canvas3) {
    class Partikel extends Canvas3.Moveable {
        constructor(_position) {
            super(_position);
        }
        move(_timeslice) {
            super.move(_timeslice);
        }
        draw() {
            Canvas3.crc2.restore();
            Canvas3.crc2.save();
            let x = 5 * Math.random() + 5;
            let y = 5 * Math.random() + 5;
            Canvas3.crc2.translate(this.position.x, this.position.y);
            Canvas3.crc2.beginPath();
            Canvas3.crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
            Canvas3.crc2.strokeStyle = "pink";
            Canvas3.crc2.fillStyle = "rgba(243,130,130,0.3)";
            Canvas3.crc2.fill();
            Canvas3.crc2.closePath();
            Canvas3.crc2.stroke();
            Canvas3.crc2.restore();
        }
    }
    Canvas3.Partikel = Partikel;
})(Canvas3 || (Canvas3 = {}));
//# sourceMappingURL=Partikel.js.map