"use strict";
var Canvas3;
(function (Canvas3) {
    class Moveable {
        constructor(_position) {
            if (_position)
                this.position = _position;
            else
                this.position = new Canvas3.Vector(0, 0);
            this.velocity = new Canvas3.Vector(0, 0);
            this.velocity.random(100, 200);
        }
        move(_timeslice) {
            let offset = new Canvas3.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += Canvas3.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += Canvas3.crc2.canvas.height;
            if (this.position.x > Canvas3.crc2.canvas.width)
                this.position.x -= Canvas3.crc2.canvas.width;
            if (this.position.y > Canvas3.crc2.canvas.height)
                this.position.y -= Canvas3.crc2.canvas.height;
        }
        draw() {
            // console.log("Moveable move");
        }
    }
    Canvas3.Moveable = Moveable;
})(Canvas3 || (Canvas3 = {}));
//# sourceMappingURL=Moveable.js.map