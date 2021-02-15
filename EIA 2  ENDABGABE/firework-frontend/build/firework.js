"use strict";
var firework;
(function (firework) {
    let rockets = [];
    let scatters = [];
    let selectedRocket;
    window.addEventListener("load", onPageLoad);
    function onPageLoad() {
        firework.canvas = document.getElementById("canvas");
        if (!firework.canvas)
            return;
        firework.canvas.addEventListener("click", launchRockets);
        firework.crc2 = firework.canvas.getContext("2d");
        setBackground(firework.canvas);
        setInterval(gameLoop, 1000 / 60);
    }
    function launchRockets() {
        for (var i = 0; i < 15; i++) {
            launchFrom(Math.random() * firework.canvas.width * 2 / 3 + firework.canvas.width / 6);
        }
    }
    function launchFrom(posX) {
        if (rockets.length < 10) {
            let pos = { x: posX, y: firework.canvas.height };
            var rocket = new firework.Rocket(pos);
            rocket.color = "rgba(" + firework.Color.BLUE + ", 100%, 50%)";
            ;
            rocket.vel.y = Math.random() * -3 - 4;
            rocket.vel.x = Math.random() * 6 - 3;
            rocket.size = 8;
            rocket.shrink = 0.999;
            rocket.gravity = 0.01;
            rockets.push(rocket);
        }
    }
    function gameLoop() {
        for (var i = 0; i < rockets.length; i++) {
            // update and render
            rockets[i].update();
            rockets[i].draw();
            if (rockets[i].pos.y < firework.canvas.height && rockets[i].pos.y > firework.canvas.height / 2) {
                rockets[i].explode();
            }
        }
        for (var i = 0; i < scatters.length; i++) {
            scatters[i].update();
            // render and save particles that can be rendered
            scatters[i].draw();
        }
    }
    function getRockets() {
    }
    function setBackground(canvas) {
        // Make it visually fill the positioned parent
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // ...then set the internal size to match
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        firework.crc2.fillStyle = "black";
        firework.crc2.fillRect(0, 0, canvas.width, canvas.height);
        var text = "Welcome!";
        firework.crc2.textAlign = "center";
        firework.crc2.fillStyle = "red";
        firework.crc2.font = "30px Comic Sans MS";
        firework.crc2.fillText(text, canvas.width / 2, canvas.height / 4);
        firework.crc2.save();
    }
})(firework || (firework = {}));
//# sourceMappingURL=firework.js.map