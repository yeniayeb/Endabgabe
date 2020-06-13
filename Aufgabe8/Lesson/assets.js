"use strict";
var A08;
(function (A08) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let canvas;
    function handleLoad(_event) {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        drawBackground();
        let bodyPositionMin = { "x": 50, "y": 200 };
        let bodyPositionMax = { "x": 250, "y": 550 };
        for (let i = 0; i < 2; i++) {
            let X = Math.random() * (bodyPositionMax.x - bodyPositionMin.x) + bodyPositionMin.x;
            let Y = Math.random() * (bodyPositionMax.y - bodyPositionMin.y) + bodyPositionMin.y;
            drawBodyCell({ "x": X, "y": Y }, { "x": 40, "y": 40 });
        }
        let coronaPositionMin = { "x": 300, "y": 0 };
        let coronaPositionMax = { "x": 350, "y": 300 };
        for (let i = 0; i < 5; i++) {
            let X = Math.random() * (coronaPositionMax.x - coronaPositionMin.x) + coronaPositionMin.x;
            let Y = Math.random() * (coronaPositionMax.y - coronaPositionMin.y) + coronaPositionMin.y;
            drawCorona({ "x": X, "y": Y }, { "x": 30, "y": 30 });
        }
        let killerPositionMin = { "x": 30, "y": 300 };
        let killerPositionMax = { "x": 300, "y": 600 };
        for (let i = 0; i < 3; i++) {
            let X = Math.random() * (killerPositionMax.x - killerPositionMin.x) + killerPositionMin.x;
            let Y = Math.random() * (killerPositionMax.y - killerPositionMin.y) + killerPositionMin.y;
            drawKillerCell({ "x": X, "y": Y }, { "x": 30, "y": 30 });
        }
        let antiPositionMin = { "x": 0, "y": 350 };
        let antiPositionMax = { "x": 200, "y": 600 };
        for (let i = 0; i < 10; i++) {
            let X = Math.random() * (antiPositionMax.x - antiPositionMin.x) + antiPositionMin.x;
            let Y = Math.random() * (antiPositionMax.y - antiPositionMin.y) + antiPositionMin.y;
            drawAntiBody({ "x": X, "y": Y }, { "x": 20, "y": 20 });
        }
        let cellsPositionMin = { "x": 0, "y": 0 };
        let cellsPositionMax = { "x": 350, "y": 600 };
        for (let i = 0; i < 50; i++) {
            let X = Math.random() * (cellsPositionMax.x - cellsPositionMin.x) + cellsPositionMin.x;
            let Y = Math.random() * (cellsPositionMax.y - cellsPositionMin.y) + cellsPositionMin.y;
            drawBloodCell({ "x": X, "y": Y }, { "x": 10, "y": 10 });
        }
    }
    function drawAntiBody(_position, _size) {
        crc2.strokeStyle = "orange";
        crc2.lineWidth = 5;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(-7, 0);
        crc2.lineTo(-7, -25);
        crc2.moveTo(-7, -25);
        crc2.lineTo(-17, -35);
        crc2.moveTo(-15, -23);
        crc2.lineTo(-25, -33);
        crc2.moveTo(7, 0);
        crc2.lineTo(7, -25);
        crc2.moveTo(7, -25);
        crc2.lineTo(17, -35);
        crc2.moveTo(15, -23);
        crc2.lineTo(25, -33);
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
    }
    function drawCorona(_position, _size) {
        crc2.strokeStyle = "black";
        crc2.lineWidth = 1;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(40, 25);
        crc2.moveTo(0, 0);
        crc2.lineTo(-50, -25);
        crc2.moveTo(0, 0);
        crc2.lineTo(-25, 60);
        crc2.moveTo(0, 0);
        crc2.lineTo(25, -40);
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
        crc2.strokeStyle = "black";
        crc2.fillStyle = "red";
        crc2.shadowColor = "gray";
        crc2.shadowOffsetX = 1;
        crc2.shadowOffsetY = 1;
        crc2.shadowBlur = 5;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.arc(0, 0, _size.x, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
    }
    function drawBloodCell(_position, _size) {
        crc2.globalAlpha = 0.2;
        let rand = Math.floor(Math.random() * (3 - 1) + 1);
        if (rand == 1) {
            crc2.fillStyle = "yellow";
        }
        else {
            crc2.fillStyle = "red";
        }
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.arc(0, 0, _size.x, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }
    function drawKillerCell(_position, _size) {
        crc2.strokeStyle = "black";
        crc2.lineWidth = 8;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(60, 25);
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
        crc2.strokeStyle = "black";
        crc2.fillStyle = "darkred";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.arc(0, 0, _size.x, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
        crc2.fillStyle = "#ff0000";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.arc(0, 0, _size.x / 2, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
    }
    function drawBodyCell(_position, _size) {
        crc2.lineWidth = 3;
        crc2.strokeStyle = "black";
        crc2.fillStyle = "green";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.arc(0, 0, _size.x, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
        crc2.lineWidth = 1;
        crc2.fillStyle = "white";
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.arc(0, 0, _size.x / 4, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
        crc2.fillStyle = "black";
        crc2.save();
        crc2.translate(_position.x + 15, _position.y + 17);
        crc2.beginPath();
        crc2.arc(0, 0, 4, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
        crc2.fillStyle = "brown";
        crc2.save();
        crc2.translate(_position.x - 15, _position.y - 10);
        crc2.beginPath();
        crc2.arc(0, 0, 4, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        crc2.stroke();
        crc2.restore();
    }
    function drawBackground() {
        let pattern = document.createElement('canvas').getContext('2d');
        pattern.canvas.width = 15;
        pattern.canvas.height = 20;
        pattern.fillStyle = 'pink';
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
        crc2.fillStyle = crc2.createPattern(pattern.canvas, 'repeat');
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }
})(A08 || (A08 = {}));
//# sourceMappingURL=main.js.map