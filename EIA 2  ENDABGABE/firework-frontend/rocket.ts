
/// <reference path="scatter.ts" />
namespace firework {

    export class Rocket extends Moveable {

        private readonly MAX_EXPLOSION = 100;
        private readonly MIN_EXPLOSION = 50;

        _id?: string;
        name?: string;
        scatterSize: number;
        scatters_: Scatter[];
        speed: number;

        constructor(v: Vector, rocketObj: RocketObject) {

            super(v);
            this.size = 4;
            this.scatterSize = rocketObj.size;
            this.speed = rocketObj.speed;
            this.color = rocketObj.color;
            this.secondColor = rocketObj.secondColor;
            this.scatters_ = [];
        }

        update(): void {
            // update position based on speed
            this.pos.x += this.vel.x * 1.5;
            this.pos.y += this.vel.y * this.speed;

        }

        draw(): void {
            //dont render if object does not exist anymore
            if (!this.exists()) {
                return;
            }

            let x = this.pos.x,
                y = this.pos.y,
                r = this.size;
            // create gradient color
            var gradient = crc2.createRadialGradient(x, y, 0.1, x, y, r);
            gradient.addColorStop(0.1, "rgba(255, 255, 0 ," + this.alpha + ")");
            gradient.addColorStop(1, "rgba(255, 0, 0, " + this.alpha + ")");

            crc2.fillStyle = gradient;

            crc2.beginPath();
            // circle = rocket body
            crc2.arc(x, y, this.size, 0, Math.PI * 2, true);
            crc2.closePath();
            crc2.fill();

            crc2.restore();
        }

        createScatter(): Scatter[] {
            //scatter amount random between max and min amount
            let count = Math.random() * this.MAX_EXPLOSION + this.MIN_EXPLOSION;
            //generate scatter objects for each rocket 
            for (let i = 0; i < count; i++) {

                let scatter: Scatter = new Scatter(this.pos);
                // area to fill the maximum angle
                let angle: number = Math.random() * Math.PI * 2;

                // emulate 3D effect by using cosine and put more particles in the middle
                let speed = Math.sin(Math.random() * Math.PI / 2) * 15;
                // initialize scatter objects
                scatter.vel.x = Math.cos(angle) * speed;
                scatter.vel.y = Math.sin(angle) * speed;

                scatter.size = 4;
                scatter.resistance = this.scatterSize;

                scatter.color = this.color;
                scatter.secondColor = this.secondColor;
                //get rockets scatter
                this.scatters_.push(scatter);

            }
            return this.scatters_;

        }
        // call both 
        animate():void {
            this.update();
            this.draw();
        }
    }
}