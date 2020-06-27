"use strict";
var Canvas3;
(function (Canvas3) {
    class Killerzelle extends Canvas3.Moveable {
        constructor(_position) {
            super(_position);
        }
        draw() {
            Canvas3.crc2.restore();
            Canvas3.crc2.save();
            let x = 2 * Math.random() + 30;
            let y = 2 * Math.random() + 40;
            Canvas3.crc2.translate(this.position.x, this.position.y);
            Canvas3.crc2.beginPath();
            let gradient = Canvas3.crc2.createLinearGradient(this.position.x, this.position.y, x, y);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.5, "white");
            gradient.addColorStop(1, " green");
            Canvas3.crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
            Canvas3.crc2.strokeStyle = "black";
            Canvas3.crc2.fillStyle = gradient;
            Canvas3.crc2.fill();
            Canvas3.crc2.closePath();
            Canvas3.crc2.stroke();
        }
    }
    Canvas3.Killerzelle = Killerzelle;
})(Canvas3 || (Canvas3 = {}));
//# sourceMappingURL=Killerzellen.js.map