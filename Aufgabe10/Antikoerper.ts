namespace Canvas3 {
    export class Antikorb extends Moveable {
       

        constructor(_position?: Vector) {
            super(_position);
            
        }

    

        draw(): void {
                crc2.restore();
                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.beginPath();
               
                crc2.moveTo(0, 30);
                crc2.lineTo(0, 15);
                crc2.moveTo(0, 15);
                crc2.lineTo(15, 10);
                crc2.moveTo(0, 20);
                crc2.lineTo(-15, 4);
                crc2.lineWidth = 7;
                crc2.strokeStyle = "white";
                crc2.closePath();
                crc2.stroke();
                crc2.restore();
        }

    }
}