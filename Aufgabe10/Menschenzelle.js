"use strict";
var Canvas3;
(function (Canvas3) {
    class Meschenzelle extends Canvas3.Moveable {
        constructor(_position) {
            super(_position);
        }
        draw() {
            let r1 = 3;
            let r2 = 20;
            let particle = new Path2D();
            let gradient = Canvas3.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.1, "rgb(176,224,230)");
            gradient.addColorStop(1, "white");
            Canvas3.crc2.save();
            Canvas3.crc2.translate(this.position.x, this.position.y);
            Canvas3.crc2.fillStyle = gradient;
            Canvas3.crc2.fill(particle);
            Canvas3.crc2.restore();
        }
    }
    Canvas3.Meschenzelle = Meschenzelle;
})(Canvas3 || (Canvas3 = {}));
//# sourceMappingURL=Menschenzelle.js.map