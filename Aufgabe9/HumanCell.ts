namespace L09CoronaVirus {


    export class HumanCells {


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

            let radiusParticle: number = 20;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.3, "green");
            gradient.addColorStop(0.7, "#E6E6FA");
            gradient.addColorStop(1, "#E6E6FA");



            crc2.resetTransform();

            crc2.translate(this.position.x, this.position.y);

            crc2.fillStyle = gradient;

            crc2.scale(this.size, this.size);

                
                
            
            crc2.fill(particle);
            crc2.restore();

        }
    }
}


