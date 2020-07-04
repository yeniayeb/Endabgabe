"use strict";
var L10_Corona;
(function (L10_Corona) {
    class Particle extends L10_Corona.Cell {
        constructor(_position) {
            super(_position);
            let colors = ["HSL(0, 50%, 100%)", "HSLA(360, 40%, 60%)"];
            let numColors = colors.length;
            let color;
            let ColorIndex;
            ColorIndex = Math.round(Math.random() * (numColors - 1));
            color = colors[ColorIndex];
            this.color = color;
            let maxRadius = 3;
            let minRadius = 1;
            this.radius = minRadius + (Math.random() * (maxRadius - minRadius));
            this.velocity = new L10_Corona.Vector(0, 0);
            this.velocity.random(10, 100);
        }
        draw() {
            console.log("Cell draw");
            L10_Corona.crc2.save();
            let r1 = 1;
            let r2 = 8;
           
            let particle = new Path2D();
            let gradient = L10_Corona.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSL(0, 50%, 100%)");
            gradient.addColorStop(0.8, "HSLA(360, 40%, 60%)");
            gradient.addColorStop(0.9, "HSLA(360, 40%, 60%)");
            L10_Corona.crc2.save();
            L10_Corona.crc2.translate(this.position.x, this.position.y);
            L10_Corona.crc2.fillStyle = gradient;
            L10_Corona.crc2.fill(particle);
            L10_Corona.crc2.restore();
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
    L10_Corona.Particle = Particle;
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Particle.js.map