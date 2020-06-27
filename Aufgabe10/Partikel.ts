namespace Canvas3 {
    export class Partikel extends Moveable {
        

        constructor(_position?: Vector) {
            super(_position);
        }

        move(_timeslice: number): void {
            super.move(_timeslice);
        }

        draw(): void {
            crc2.restore();
            crc2.save();
            let x: number = 5 * Math.random() + 5;
            let y: number = 5 * Math.random() + 5;
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
            crc2.strokeStyle = "pink";
            crc2.fillStyle =  "rgba(243,130,130,0.3)";
            crc2.fill();
            crc2.closePath();
            crc2.stroke();
            crc2.restore();
        }

        
    }
}