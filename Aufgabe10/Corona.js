"use strict";
var Canvas3;
(function (Canvas3) {
    class Corona extends Canvas3.Moveable {
        constructor(_position) {
            super(_position);
        }
        move(_timeslice) {
            super.move(_timeslice);
        }
        draw() {
            Canvas3.crc2.restore();
            Canvas3.crc2.save();
            Canvas3.crc2.translate(this.position.x, this.position.y);
            for (let i = 0; i < 9; i++) {
                Canvas3.crc2.beginPath();
                Canvas3.crc2.rotate(20);
                Canvas3.crc2.moveTo(10, 40);
                Canvas3.crc2.lineTo(10, 40);
                Canvas3.crc2.lineTo(15, 30);
                Canvas3.crc2.lineTo(0, 40);
                Canvas3.crc2.strokeStyle = "green";
                Canvas3.crc2.lineWidth = 1;
                Canvas3.crc2.fillStyle = "black";
                Canvas3.crc2.fill();
                Canvas3.crc2.stroke();
            }
            Canvas3.crc2.beginPath();
            Canvas3.crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            Canvas3.crc2.fillStyle = "black";
            Canvas3.crc2.fill();
            Canvas3.crc2.closePath();
            Canvas3.crc2.restore();
        }
    }
    Canvas3.Corona = Corona;
})(Canvas3 || (Canvas3 = {}));
//# sourceMappingURL=Corona.js.map