namespace firework {
 // abstract class for rocket and scatter
    export abstract class Moveable {
      public pos: Vector = { x: 0, y: 0 };
      public vel: Vector = { x: 0, y: 0 };
      public size: number;
      public alpha: number;
      public color: number;
      public secondColor: number;
      
      constructor(v:Vector){
        this.pos = v;
        this.alpha = 1;
      }
      
      abstract draw(): void;
      abstract update(): void;
      abstract animate(): void;

      //if not faded and size not <= 1 the object still exists
      exists(): boolean {
        return this.alpha >= 0.1 && this.size >= 1;
    }
    }
  
}