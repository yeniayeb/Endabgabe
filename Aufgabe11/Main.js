"use strict";
var L10_Corona;
(function (L10_Corona) {
    let middle = 0.95;
    let humanCell = [];
    
    let viren = [];
    let cells = [];
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L10_Corona.crc2 = canvas.getContext("2d");
        drawCellTissue();
        createParticles(new L10_Corona.Vector(260, 490), 50);
        drawHumanCells(new L10_Corona.Vector(200, 300), new L10_Corona.Vector(100, 120), 10, false);
        drawVirus(new L10_Corona.Vector(120, 300), false, 5);
        

        createAntibodies(new L10_Corona.Vector(250, 400), 7);
        createkillerCells(new L10_Corona.Vector(100, 50), 7);
        setInterval(frame, 100);
    }
    function drawCellTissue() {
        console.log("background");
        let gradient = L10_Corona.crc2.createLinearGradient(0, 0, 0, L10_Corona.crc2.canvas.height);
        gradient.addColorStop(0, "HSL(0, 50%, 70%)");
        gradient.addColorStop(middle, "black");
        L10_Corona.crc2.fillStyle = gradient;
        L10_Corona.crc2.fillRect(0, 0, L10_Corona.crc2.canvas.width, L10_Corona.crc2.canvas.height);
        let pattern = document.createElement("canvas").getContext("2d");
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
        L10_Corona.crc2.fillStyle = L10_Corona.crc2.createPattern(pattern.canvas, "repeat");
        L10_Corona.crc2.fillRect(0, 0, L10_Corona.crc2.canvas.width, L10_Corona.crc2.canvas.height);
    }
    function redrawAll() {
        drawCellTissue();
        drawHumanCells(new L10_Corona.Vector(200, 300), new L10_Corona.Vector(0, 0), humanCell.length, true);
    }
    function drawHumanCells(_position, _size, _number, _redraw) {
       
        let r1 = 1;
        let r2 = 15;
        let nParticles = 10;
        let particle = new Path2D();
        let gradient = L10_Corona.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        particle.arc(0, 0, r2, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSL(360, 0%, 60%)");
        gradient.addColorStop(0.5, "HSLA(360, 0%, 100%)");
        gradient.addColorStop(0.8, "HSLA(360, 0%, 100%)");
        L10_Corona.crc2.save();
        L10_Corona.crc2.translate(_position.x, _position.y);
        L10_Corona.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < _number; drawn++) {
            L10_Corona.crc2.save();
            if (_redraw) {
                let cell = humanCell[drawn];
                L10_Corona.crc2.translate(cell.size.x, cell.size.y);
            }
            else {
                let x = (Math.random() - 0.5) * _size.x;
                let y = -(Math.random() * _size.y);
                L10_Corona.crc2.translate(x, y);
                humanCell.push(new L10_Corona.Humancell(_position, new L10_Corona.Vector(x, y)));
            }
            L10_Corona.crc2.fill(particle);
            L10_Corona.crc2.restore();
        }
        L10_Corona.crc2.restore();
    }
    function createVirus(_position) {
        
        L10_Corona.crc2.restore();
        L10_Corona.crc2.save();
        L10_Corona.crc2.translate(_position.x, _position.y);
        for (let i = 0; i < 9; i++) {
            L10_Corona.crc2.beginPath();
            L10_Corona.crc2.rotate(20);
            L10_Corona.crc2.moveTo(5, 20);
            L10_Corona.crc2.lineTo(20, 40);
            L10_Corona.crc2.lineTo(15, 30);
            L10_Corona.crc2.lineTo(10, 40);
            L10_Corona.crc2.strokeStyle = "black";
            L10_Corona.crc2.lineWidth = 1;
            L10_Corona.crc2.fillStyle = "green";
            L10_Corona.crc2.fill();
            L10_Corona.crc2.stroke();
        }
        L10_Corona.crc2.beginPath();
        L10_Corona.crc2.arc(0, 0, 20, 0, 2 * Math.PI);
        L10_Corona.crc2.fillStyle = "black";
        L10_Corona.crc2.fill();
        L10_Corona.crc2.closePath();
        L10_Corona.crc2.restore();
    }
    function drawVirus(_size, _redraw, _number) {
        for (let drawn = 0; drawn < _number; drawn++) {
            L10_Corona.crc2.save();
            let x;
            let y;
            if (_redraw) {
                let cell = viren[drawn];
                x = cell.size.x;
                y = cell.size.y;
            }
            else {
                x = (Math.random() + 0.5) * _size.x;
                y = -((Math.random() - 2) * _size.y);
                viren.push(new L10_Corona.Humancell(new L10_Corona.Vector(0, 0), new L10_Corona.Vector(x, y)));
            }
            L10_Corona.crc2.translate(x, y);
            createVirus(new L10_Corona.Vector(x, y));
            L10_Corona.crc2.restore();
        }
        L10_Corona.crc2.restore();
    }
    
    function animation() {
        return setInterval(frame, 50);
    }
    function stopAnimation(_interval) {
        if (_interval)
            clearInterval(_interval);
    }
    function frame() {
        refresh();
        for (let i = 0; i < cells.length; i++) {
            cells[i].move(1 / 50);
            cells[i].draw();
        }
        console.log(cells);
    }
    function createParticles(_position, _n) {
        for (let i = 0; i < _n; i++) {
            let x = (Math.random() - 0.5) * _position.x;
            let y = -(Math.random() * _position.y);
            cells.push(new L10_Corona.Particle(new L10_Corona.Vector(x, y)));
        }
    }
    function createAntibodies(_position, _n) {
        for (let i = 0; i < _n; i++) {
            let x = Math.random() * L10_Corona.crc2.canvas.width / 1.4;
            let y = 250 + (20 * Math.random());
            cells.push(new L10_Corona.Antibody(new L10_Corona.Vector(x, y)));
        }
    }
    function createkillerCells(_position, _n) {
        for (let i = 0; i < _n; i++) {
            let x = Math.random() * L10_Corona.crc2.canvas.width / 1.8;
            let y = 50 + (20 * Math.random());
            cells.push(new L10_Corona.Killercell(new L10_Corona.Vector(x, y)));
        }
    }
    function drawAntibodies() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].draw();
        }
    }
    function drawParticles() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].draw();
        }
    }
    
    function refresh() {
        drawCellTissue();
        drawHumanCells(new L10_Corona.Vector(200, 300), new L10_Corona.Vector(100, 120), humanCell.length, true);
        drawVirus(new L10_Corona.Vector(120, 300), true, 5);
    }
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Main.js.map