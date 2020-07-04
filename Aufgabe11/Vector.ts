namespace L10_Corona {
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }
       public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

       public scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }
        
        public add(_addend: Vector): void {
            this.x  += _addend.x;
            this.y  += _addend.y;

        }
       public random(_minLength: number, _maxLength: number): void {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = Math.random() * 2 * Math.PI;

            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
    }

        
}