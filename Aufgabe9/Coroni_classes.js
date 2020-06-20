"use strict";
var L09CoronaVirus;
(function (L09CoronaVirus) {
    class CoronaVirus {
        constructor(_size, _position) {
            console.log("Coroni constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L09CoronaVirus.Vector(0, 0);
            this.velocity = new L09CoronaVirus.Vector(0, 0);
            this.velocity.random(20, 50);
            console.log(this.velocity);
            this.size = _size;
        }
        move(_timeslice) {
            console.log("Coroni move");
            let offset = new L09CoronaVirus.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L09CoronaVirus.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L09CoronaVirus.crc2.canvas.height;
            if (this.position.x > L09CoronaVirus.crc2.canvas.width)
                this.position.x -= L09CoronaVirus.crc2.canvas.width;
            if (this.position.y > L09CoronaVirus.crc2.canvas.height)
                this.position.y -= L09CoronaVirus.crc2.canvas.height;
        }
        draw() {
            L09CoronaVirus.crc2.resetTransform();
            L09CoronaVirus.crc2.save();
            L09CoronaVirus.crc2.translate(this.position.x, this.position.y);
            console.log("Coroni draw");
            for (let i = 0; i < 8; i++) {
                L09CoronaVirus.crc2.beginPath();
                L09CoronaVirus.crc2.rotate(10);
                L09CoronaVirus.crc2.moveTo(0, 40);
                L09CoronaVirus.crc2.lineTo(0, 50);
                L09CoronaVirus.crc2.strokeStyle = "black";
                L09CoronaVirus.crc2.lineWidth = 2;
                L09CoronaVirus.crc2.stroke();
                L09CoronaVirus.crc2.closePath();
            }
            
            L09CoronaVirus.crc2.beginPath();
            L09CoronaVirus.crc2.arc(0, 0, 40, 0, 2 * Math.PI);
            L09CoronaVirus.crc2.fillStyle = "blue";
            L09CoronaVirus.crc2.fill();
            L09CoronaVirus.crc2.closePath();
        }
    }
    L09CoronaVirus.CoronaVirus = CoronaVirus;
})(L09CoronaVirus || (L09CoronaVirus = {}));
//# sourceMappingURL=Coroni_classes.js.map