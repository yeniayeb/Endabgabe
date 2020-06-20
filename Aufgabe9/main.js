"use strict";
var L09CoronaVirus;
(function (L09CoronaVirus) {
    window.addEventListener("load", handleLoad);
    let viruss = [];
    let cells = [];
    let partis = [];
    function handleLoad(_event) {
        console.log("Bam");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L09CoronaVirus.crc2 = canvas.getContext("2d");
        drawBackground();
        createCoronii(10);
        window.setInterval(update, 20);
        createCell(10);
        window.setInterval(update, 20);
        createParti(50);
    }
    function drawBackground() {
        console.log("Background");
        L09CoronaVirus.crc2.resetTransform();
        
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 15;
        pattern.canvas.height = 20;
        pattern.fillStyle = 'darkred';
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineTo(5, 10);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 10);
        pattern.lineTo(30, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(10, 10);
        pattern.stroke();
       
        pattern.beginPath();
        pattern.arc(50, 20, 2, 0, 2 * Math.PI);
        pattern.fillStyle = "beige";
        pattern.fill();
        L09CoronaVirus.crc2.fillStyle = L09CoronaVirus.crc2.createPattern(pattern.canvas, "repeat");
        L09CoronaVirus.crc2.fillRect(0, 0, L09CoronaVirus.crc2.canvas.width, L09CoronaVirus.crc2.canvas.height);
    }
    function createCoronii(_nCoronii) {
        for (let i = 0; i < _nCoronii; i++) {
            let coronii = new L09CoronaVirus.CoronaVirus(1.0);
            viruss.push(coronii);
        }
        console.log(viruss);
    }
    function createCell(_nCoronii) {
        for (let i = 0; i < _nCoronii; i++) {
            let cell = new L09CoronaVirus.HumanCells(1.0);
            viruss.push(cell);
        }
    }
    function createParti(_nCoronii) {
        for (let i = 0; i < _nCoronii; i++) {
            let parti = new L09CoronaVirus.Particles(1.0);
            partis.push(parti);
        }
    }
    function update() {
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
})(L09CoronaVirus || (L09CoronaVirus = {}));
//# sourceMappingURL=main.js.map