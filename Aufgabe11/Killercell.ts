namespace L10_Corona{
    export class Killercell extends Cell {

          constructor(_position: Vector) {
            super(_position);
    
            this.velocity = new Vector(0, 0);
            this.velocity.random(10, 100);
            
        }
       public draw(): void {
            let radiusK: number = 20;
       
            crc2.beginPath();
            crc2.moveTo(this.position.x,this.position.y);
            crc2.arc(this.position.x + 20, this.position.y + 20, radiusK, 0.2 * Math.PI, 1.8 * Math.PI, false);
            crc2.lineTo(this.position.x + 20, this.position.y + 20);
            crc2.closePath();
            crc2.fillStyle = "black";
            crc2.strokeStyle = "white";
            crc2.fill();
            crc2.stroke();
            crc2.save();
        }

        public move(_timeslice: number): void {
            super.move(_timeslice);
    
            if (this.position.x < 0)
            this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
            this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
            this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
            this.position.y -= crc2.canvas.height;
    
    
        }
    }
}