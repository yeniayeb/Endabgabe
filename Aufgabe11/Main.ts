

namespace L10_Corona {
    
    export let crc2: CanvasRenderingContext2D;
    let middle: number = 0.95;
    export let canvas: HTMLCanvasElement;
    

    

    let humanCell: Humancell[] = [];
   
    
    let viren: Humancell[] = [];
    let cells: Cell[] = [];
    

    window.addEventListener("load", handleLoad);
    
    
    function handleLoad (_event: Event): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        
        drawCellTissue();
        
        createParticles( new Vector( 260, 490), 50);
        
        drawHumanCells(new Vector (200, 300), new Vector(100, 120), 10, false);
       
        drawVirus(new Vector(120, 300), false, 5);
        
        createAntibodies(new Vector(250, 400), 7);
        createkillerCells(new Vector(100, 50), 7);
        setInterval(frame, 100);
        
        



    }
    function drawCellTissue(): void {
        console.log("background");

       
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "HSL(0, 50%, 70%)");
        gradient.addColorStop(middle, "black");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        
        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
        
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;

        pattern.fillStyle = "darkred";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineTo(10, 10);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 10);
        pattern.lineTo(30, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(10, 10);
        pattern.stroke();

        pattern.strokeStyle = "HSL(0, 30%, 90%)";
        pattern.stroke();
        pattern.closePath();

        crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    }

    function redrawAll(): void {
      drawCellTissue();
      drawHumanCells( new Vector(200, 300), new Vector(0, 0), humanCell.length, true);
    }
    function drawHumanCells(_position: Vector, _size: Vector, _number: number, _redraw: boolean): void {
       
        let r1: number = 1;
        let r2: number = 15;
        let nParticles: number = 10;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        particle.arc(0, 0, r2, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSL(360, 0%, 60%)");
        gradient.addColorStop(0.5, "HSLA(360, 0%, 100%)"); 
        gradient.addColorStop(0.8, "HSLA(360, 0%, 100%)");
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        
        
        

        for (let drawn: number = 0; drawn < _number; drawn++) {
            crc2.save();
            if (_redraw) {
                let cell: any = humanCell[drawn];
                crc2.translate(cell.size.x, cell.size.y);
            }
            else {
                let x: number = (Math.random() - 0.5) * _size.x;
                let y: number = -(Math.random() * _size.y);
                crc2.translate(x, y);
                humanCell.push(new Humancell(_position, new Vector(x, y)));
            }
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();

    }

    
    function createVirus(_position: Vector): void {
        
        crc2.restore();
        crc2.save();
        crc2.translate(_position.x, _position.y);
        for (let i: number = 0; i < 9; i++) {
            crc2.beginPath();
            crc2.rotate(20);
            crc2.moveTo(5, 20);
            crc2.lineTo(20, 40);
            crc2.lineTo(15, 30);
            crc2.lineTo(10, 40);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 1;
            crc2.fillStyle = "green";
            crc2.fill();
            crc2.stroke();
        }
        crc2.beginPath();
        crc2.arc(0, 0, 20, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    function drawVirus(_size: Vector, _redraw: boolean, _number: number): void {
        
        for (let drawn: number = 0; drawn < _number; drawn++) {
            crc2.save();
            let x: number;
            let y: number;
            if (_redraw) {
                let cell: any = viren[drawn];
                x = cell.size.x;
                y = cell.size.y;

            }
            else {
             x = (Math.random() + 0.5) * _size.x;
             y = -((Math.random() - 2) * _size.y);
             viren.push(new Humancell(new Vector(0, 0), new Vector(x, y)));

            }
            
            crc2.translate(x, y);
            createVirus( new Vector(x, y));
            crc2.restore();
        }
        crc2.restore();
    }
    
    
        

    function animation() {
        return setInterval(frame, 50);
    } 

    function stopAnimation(_interval: any): void {
       
        if (_interval)
           clearInterval(_interval);
    }
    function frame(): void {
        refresh();
        for (let i: number = 0; i < cells.length; i++) {
            cells[i].move(1 / 50);
            cells[i].draw();
        }
        
        console.log(cells);
    }
    function createParticles(_position: Vector, _n: number): void {
        for (let i: number = 0; i < _n; i++) {
            let x: number = (Math.random() - 0.5) * _position.x;
            let y: number = -(Math.random() * _position.y);
            cells.push(new Particle( new Vector(x, y)));
            
        }
     }
    function createAntibodies(_position: Vector, _n: number): void {
        for (let i: number = 0; i < _n; i++) {
            let x: number = Math.random() * crc2.canvas.width / 1.4;
            let y: number = 250 + (20 * Math.random());
            cells.push(new Antibody(new Vector(x, y)));
            
            
        }
    }

    function createkillerCells(_position: Vector, _n: number): void {
        for (let i: number = 0; i < _n; i++) {
            let x: number = Math.random() * crc2.canvas.width / 1.8;
            let y: number = 50 + (20 * Math.random());
            cells.push(new Killercell(new Vector(x, y)));

        }
    }
    function drawAntibodies(): void {
        for (let i: number = 0; i < cells.length; i++) {
            cells[i].draw();
        }
    }
    
    function drawParticles(): void {
        for (let i: number = 0; i < cells.length; i++) {
           cells[i].draw();
        }
    }
    
    function refresh(): void {
        drawCellTissue();
        drawHumanCells(new Vector(200, 300), new Vector(100, 120), humanCell.length, true);
        drawVirus(new Vector(120, 300), true, 5);
    }
       

    }


    
