namespace Canvas3 {
    export class Corona extends Moveable {
        position: Vector;
        velocity: Vector;
        

        constructor(_position?: Vector) {
            super(_position);
            
        }

        move(_timeslice: number): void {
            
            super.move(_timeslice);
        }

        draw(): void {
            crc2.restore();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            for (let i: number = 0; i < 9; i++) {
                crc2.beginPath();
                crc2.rotate(20);
                crc2.moveTo(10, 40);
                crc2.lineTo(10, 40);
                crc2.lineTo(15, 30);
                crc2.lineTo(0, 40);
                crc2.strokeStyle = "green";
                crc2.lineWidth = 1;
                crc2.fillStyle = "black";
                crc2.fill();
                crc2.stroke();
            }
            crc2.beginPath();
            crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
            crc2.restore();
        }

        
    }
}