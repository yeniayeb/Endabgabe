namespace L09CoronaVirus {
    window.addEventListener("load", handleLoad);
    let viruss: CoronaVirus[] = [];
    let cells: HumanCells[] = [];
    let partis: Particles[] = [];
    export let crc2: CanvasRenderingContext2D;


    

    function handleLoad(_event: Event): void {
        console.log("Bam");
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        drawBackground();
        createCoronii(10);
        window.setInterval(update, 20);
        createCell(10);

        window.setInterval(update, 20);
        createParti(50);
    }

    function drawBackground(): void {
        console.log("Background");
        crc2.resetTransform();

        
        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");

        pattern.canvas.width = 40;
        pattern.canvas.height = 20;

        pattern.fillStyle = 'pink';
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 20);
        pattern.lineTo(2, 10);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 10);
        pattern.lineTo(30, 50);
        pattern.lineTo(20, 20);
        pattern.lineTo(40, 10);
        pattern.stroke();

       
        pattern.beginPath();
        pattern.arc(50, 20, 2, 0, 2 * Math.PI);
        pattern.fillStyle = "#darkred";
        pattern.fill();

        crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function createCoronii(_nCoronii: number): void {


        for (let i: number = 0; i < _nCoronii; i++) {

            let coronii: CoronaVirus = new CoronaVirus(1.0);
            viruss.push(coronii);
        }

        console.log(viruss);
    }

    function createCell(_nCoronii: number): void {

        for (let i: number = 0; i < _nCoronii; i++) {

            let cell: HumanCells = new HumanCells(1.0);
            viruss.push(cell);
        }


    }

    function createParti(_nCoronii: number): void {

        for (let i: number = 0; i < _nCoronii; i++) {

            let parti: Particles = new Particles(1.0);
            partis.push(parti);
        }

    }
    function update(): void {

        console.log("Update");
        drawBackground();

        for (let coronii of viruss) {
            coronii.move(1 / 80);
            coronii.draw();


        }

        for (let cell of cells) {
            cell.move(1 / 100);
            cell.draw();
        }

        for (let parti of partis) {
            parti.move(1 / 50);
            parti.draw();




        }










    }


}