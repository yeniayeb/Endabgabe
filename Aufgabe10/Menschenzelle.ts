namespace Canvas3 {
    export class Meschenzelle extends Moveable{
        

        constructor( _position?: Vector) {
            super(_position);
        }

        

        draw(): void {
            let r1: number = 3;
            let r2: number = 20;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
    
            particle.arc(0, 0, r2, 0, 2 * Math.PI);
            
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.1, "rgb(176,224,230)");
            gradient.addColorStop(1, "white");
    
            crc2.save();
        
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;
            crc2.fill(particle);
            crc2.restore();
        }

    }
}