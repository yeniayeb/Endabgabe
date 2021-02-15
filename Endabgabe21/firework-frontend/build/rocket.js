"use strict";
var firework;
(function (firework) {
    class Rocket extends firework.Moveable {
        constructor(v, name, size, speed, id, color) {
            super(v);
            this.ALPHA = 1;
            this.MAX_EXPLOSION = 150;
            this.MIN_EXPLOSION = 50;
            this.vel.x = Math.random() * -3 - 4;
            this.vel.y = Math.random() * 6 - 3;
            this.name = name;
            this.size = size;
            this.speed = speed;
            this._id = id;
            this.pos.x = Math.floor(Math.random() * 1) + firework.canvas.width;
            this.pos.y = 0;
            this.color = "rgba(" + color + ", 100%, 50%)";
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
        draw() {
            let r = this.size;
            var gradient = firework.crc2.createRadialGradient(this.pos.x, this.pos.y, 0.1, this.pos.x, this.pos.y, r);
            gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.ALPHA + ")");
            gradient.addColorStop(1, "rgba(0, 0, 0, " + this.ALPHA + ")");
            firework.crc2.fillStyle = gradient;
            firework.crc2.beginPath();
            firework.crc2.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, true);
            firework.crc2.closePath();
            firework.crc2.fill();
            firework.crc2.restore();
        }
        explode() {
            let count = Math.floor(Math.random() * this.MIN_EXPLOSION) + this.MAX_EXPLOSION;
            for (var i = 0; i < count; i++) {
                let scatter = new firework.Scatter(this.pos);
                let angle = Math.random() * Math.PI * 2;
                // emulate 3D effect by using cosine and put more particles in the middle
                var speed = Math.cos(Math.random() * Math.PI / 2) * 15;
                scatter.vel.x = Math.cos(angle) * speed;
                scatter.vel.y = Math.sin(angle) * speed;
                scatter.size = 10;
                scatter.gravity = 0.2;
                scatter.resistance = 0.92;
                scatter.shrink = Math.random() * 0.05 + 0.93;
                scatter.color = this.color;
                this.scatters.push(scatter);
            }
        }
    }
    firework.Rocket = Rocket;
})(firework || (firework = {}));
//# sourceMappingURL=rocket.js.map