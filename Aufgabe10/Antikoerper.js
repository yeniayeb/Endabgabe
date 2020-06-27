"use strict";
var Canvas3;
(function (Canvas3) {
    class Antikorb extends Canvas3.Moveable {
        constructor(_position) {
            super(_position);
        }
        draw() {
            Canvas3.crc2.restore();
            Canvas3.crc2.save();
            Canvas3.crc2.translate(this.position.x, this.position.y);
            Canvas3.crc2.beginPath();
            
            Canvas3.crc2.moveTo(0, 30);
            Canvas3.crc2.lineTo(0, 15);
            Canvas3.crc2.moveTo(0, 15);
            Canvas3.crc2.lineTo(15, 10);
            Canvas3.crc2.moveTo(0, 20);
            Canvas3.crc2.lineTo(-15, 4);
            Canvas3.crc2.lineWidth = 7;
            Canvas3.crc2.strokeStyle = "#FFFF66";
            Canvas3.crc2.closePath();
            Canvas3.crc2.stroke();
            Canvas3.crc2.restore();
        }
    }
    Canvas3.Antikorb = Antikorb;
})(Canvas3 || (Canvas3 = {}));
//# sourceMappingURL=Antikoerper.js.map