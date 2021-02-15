"use strict";
var firework;
(function (firework) {
    class Scatter extends firework.Moveable {
        constructor(pos) {
            super(pos);
            this.vel = { x: 0, y: 0 };
        }
        draw() {
            firework.crc2.save();
            firework.crc2.globalCompositeOperation = 'lighter';
            var x = this.pos.x, y = this.pos.y, r = this.size / 2;
            var gradient = firework.crc2.createRadialGradient(x, y, 0.1, x, y, r);
            gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
            gradient.addColorStop(0.8, "hsla(" + 240 + ", 100%, 50%, " + this.alpha + ")");
            gradient.addColorStop(0, "hsla(" + 290 + ", 100%, 50%," + this.alpha + ")");
            firework.crc2.fillStyle = gradient;
            firework.crc2.beginPath();
            firework.crc2.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, true);
            firework.crc2.closePath();
            firework.crc2.fill();
            firework.crc2.restore();
        }
        update() {
            // apply resistance
            this.vel.x *= this.resistance;
            this.vel.y *= this.resistance;
            // gravity down
            this.vel.y += this.gravity;
            // update position based on speed
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            // shrink
            this.size *= this.shrink;
        }
    }
    firework.Scatter = Scatter;
})(firework || (firework = {}));
//# sourceMappingURL=scatter.js.map