"use strict";
var Canvas3;
(function (Canvas3) {
    window.addEventListener("load", handleLoad);
    let moveables = [];
    function handleLoad(_load) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Canvas3.crc2 = canvas.getContext("2d");
        
        createMenschenzellen(10);
        createAntikob(5);
        createKillerzelle(3);
        createCorona(10);
        createPartikel(20);
        window.setInterval(update, 20);
    }
    function drawBackground() {
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.fillStyle = "darkred";
        pattern.strokeStyle = "black";
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
        Canvas3.crc2.fillStyle = Canvas3.crc2.createPattern(pattern.canvas, "repeat");
        Canvas3.crc2.fillRect(0, 0, Canvas3.crc2.canvas.width, Canvas3.crc2.canvas.height);
    }
    function createMenschenzellen(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 300;
            let y = ((Math.random()) * 300);
            let position = new Canvas3.Vector(x, y);
            let Zelle = new Canvas3.Meschenzelle(position);
            moveables.push(Zelle);
        }
    }
    function createAntikob(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas3.Vector(x, y);
            let Antikob = new Canvas3.Antikorb(position);
            moveables.push(Antikob);
        }
    }
    function createKillerzelle(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas3.Vector(x, y);
            let killerzelle = new Canvas3.Killerzelle(position);
            moveables.push(killerzelle);
        }
    }
    function createCorona(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 1.3) * 300);
            let position = new Canvas3.Vector(x, y);
            let corona = new Canvas3.Corona(position);
            moveables.push(corona);
        }
    }
    function createPartikel(_anzahl) {
        for (let i = 0; i < _anzahl; i++) {
            let x = Math.random() * 200;
            let y = ((Math.random() + 0.5) * 300);
            let position = new Canvas3.Vector(x, y);
            let partikel = new Canvas3.Partikel(position);
            moveables.push(partikel);
        }
    }
    function update() {
        drawBackground();
        for (let cells of moveables) {
            if (cells instanceof Canvas3.Corona) {
                cells.move(1 / 300);
            }
            if (cells instanceof Canvas3.Partikel) {
                cells.move(1 / 100);
            }
            cells.draw();
        }
    }
})(Canvas3 || (Canvas3 = {}));
//# sourceMappingURL=canvas2.js.map