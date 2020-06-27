namespace Canvas3 {
    export class Killerzelle extends Moveable {
       
        

        constructor(_position?: Vector) {
            super(_position);
        }

        

        draw(): void {
            crc2.restore();
            crc2.save();
            let x: number = 2 * Math.random() + 30;
            let y: number = 2 * Math.random() + 40;
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            let gradient: CanvasGradient = crc2.createLinearGradient(this.position.x, this.position.y, x, y);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.5, "white");
            gradient.addColorStop(1, " green");
            crc2.ellipse(100, 50, x, y, 0, 90, 10, true);
            crc2.strokeStyle = "black";
            crc2.fillStyle =  gradient;
            crc2.fill();
            crc2.closePath();
            crc2.stroke();
        }

    }
}