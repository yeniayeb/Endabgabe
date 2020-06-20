namespace L09CoronaVirus {


    export class CoronaVirus {


        position: Vector;
        velocity: Vector;
        type: number;
        size: number;

        constructor(_size: number, _position?: Vector) {
            console.log("Coroni constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);

            this.velocity = new Vector(0, 0);
            this.velocity.random(20, 50);
            console.log(this.velocity);
            this.size = _size;
        }

        move(_timeslice: number): void {
            console.log("Coroni move");
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;

        }

        draw(): void {

            crc2.resetTransform();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            console.log("Coroni draw");
            for (let i: number = 0; i < 8; i++) {
                crc2.beginPath();
                crc2.rotate(10);
                crc2.moveTo(0, 40);
                crc2.lineTo(0, 50);
                crc2.strokeStyle = "#B43104";
                crc2.lineWidth = 2;
                crc2.stroke();
                crc2.closePath();
            }


            
            crc2.beginPath();
            crc2.arc(0, 0, 40, 0, 2 * Math.PI);
            crc2.fillStyle = "#822414";
            crc2.fill();
            crc2.closePath();

        }
    }

}
