"use strict";
var firework;
(function (firework) {
    class Client {
        constructor() {
            this.apiUrl = firework.herokuUrl;
        }
        async getAllRockets() {
            let settings = this.getHeaderSettings();
            try {
                const fetchResponse = await fetch(this.apiUrl + "rockets", settings);
                const data = await fetchResponse.json();
                return data;
            }
            catch (e) {
                throw Error(e);
            }
        }
        async deleteRocket(id) {
            let settings = this.getHeaderSettings("DELETE");
            try {
                const fetchResponse = await fetch(this.apiUrl + "rocket/" + id, settings);
                const data = await fetchResponse.json();
                return data;
            }
            catch (e) {
                throw Error(e);
            }
        }
        async postRocket(rockets) {
            let settings = this.getHeaderSettings('POST');
            try {
                const fetchResponse = await fetch(this.apiUrl + "rockets", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(rockets)
                });
                const data = await fetchResponse.json();
                return data;
            }
            catch (e) {
                throw Error(e);
            }
        }
        getHeaderSettings(methodType = 'GET', body) {
            switch (methodType) {
                case 'POST':
                    return {
                        method: methodType,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    };
                    break;
                default:
                    return {
                        method: methodType,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    };
            }
        }
    }
    firework.Client = Client;
})(firework || (firework = {}));
var firework;
(function (firework) {
    // server url local and heroku
    firework.localhostUrl = 'http://127.0.0.1:8081/api/';
    firework.herokuUrl = "https://firework-exercise.herokuapp.com/api/";
})(firework || (firework = {}));
var firework;
(function (firework) {
    // enums for fixed values
    let Speed;
    (function (Speed) {
        Speed[Speed["SLOW"] = 1] = "SLOW";
        Speed[Speed["MIDDLE"] = 2] = "MIDDLE";
        Speed[Speed["FAST"] = 3] = "FAST";
    })(Speed = firework.Speed || (firework.Speed = {}));
    let ScatterSize;
    (function (ScatterSize) {
        ScatterSize[ScatterSize["SMALL"] = 0.87] = "SMALL";
        ScatterSize[ScatterSize["MEDIUM"] = 0.92] = "MEDIUM";
        ScatterSize[ScatterSize["LARGE"] = 0.96] = "LARGE";
    })(ScatterSize = firework.ScatterSize || (firework.ScatterSize = {}));
    let Color;
    (function (Color) {
        Color[Color["YELLOW"] = 60] = "YELLOW";
        Color[Color["GREEN"] = 120] = "GREEN";
        Color[Color["BLUE"] = 240] = "BLUE";
        Color[Color["RED"] = 0] = "RED";
    })(Color = firework.Color || (firework.Color = {}));
})(firework || (firework = {}));
var firework;
(function (firework) {
    //all rockets
    let rockets = [];
    //all rocketobjects
    let allRockets = [];
    firework.allScatters = [];
    // dom elements for typescript 
    let addButton;
    let testButton;
    let rocketName;
    let colorSlider;
    let secondColorSlider;
    let sizeSlider;
    let speedSlider;
    let colorOutput;
    let secondColorOutput;
    let sizeOutput;
    let speedOutput;
    let rocketTable;
    // server calls
    let client;
    // first add event page load
    window.addEventListener("load", onPageLoad);
    function onPageLoad() {
        // create new client 
        client = new firework.Client();
        //initalize dom elements
        colorSlider = document.getElementById("colorSlider");
        secondColorSlider = document.getElementById("secondColorSlider");
        rocketName = document.getElementById("rocketName");
        speedSlider = document.getElementById("speedSlider");
        sizeSlider = document.getElementById("sizeSlider");
        colorOutput = document.getElementById("colorOutput");
        colorOutput.innerHTML = colorSlider.value;
        secondColorOutput = document.getElementById("secondColorOutput");
        secondColorOutput.innerHTML = secondColorSlider.value;
        sizeOutput = document.getElementById("sizeOutput");
        sizeOutput.innerHTML = sizeSlider.value;
        speedOutput = document.getElementById("speedOutput");
        speedOutput.innerHTML = speedSlider.value;
        rocketTable = document.getElementById("rocketBody");
        // show values in html
        colorSlider.oninput = function (event) {
            let target = event.target;
            colorOutput.innerHTML = target.value;
        };
        // show values in html
        secondColorSlider.oninput = function (event) {
            let target = event.target;
            secondColorOutput.innerHTML = target.value;
        };
        // show values in html
        speedSlider.oninput = function (event) {
            let target = event.target;
            speedOutput.innerHTML = target.value;
        };
        // show values in html
        sizeSlider.oninput = function (event) {
            let target = event.target;
            sizeOutput.innerHTML = target.value;
        };
        //buttons
        addButton = document.getElementById("addRocket");
        testButton = document.getElementById("testRocket");
        firework.canvas = document.getElementById("canvas");
        //dont do anything if no canvas available
        if (!firework.canvas)
            return;
        //add click events
        firework.canvas.addEventListener("mousedown", launchRockets);
        addButton.addEventListener("click", postRocket);
        testButton.addEventListener("click", testRocket);
        firework.crc2 = firework.canvas.getContext("2d");
        //add inital canvas style
        firework.canvas.style.width = '100%';
        firework.canvas.style.height = '100%';
        // ...then set the internal size to match
        firework.canvas.width = firework.canvas.offsetWidth;
        firework.canvas.height = firework.canvas.offsetHeight;
        //set the background from canvas
        setBackground();
        // get on page load all rocket from database
        getAllRockets();
        //start the gameloop
        setInterval(gameLoop, 16);
    }
    function launchRockets(event) {
        //generate a x position where the rockets start
        for (let i = 0; i < allRockets.length; i++) {
            launchFrom(Math.random() * firework.canvas.width * 2 / 3 + firework.canvas.width / 6, allRockets[i]);
        }
    }
    // get the values from html and create new rocketobject and pass it to other function
    function testRocket() {
        let testRocket = {
            name: rocketName.value,
            color: Number.parseInt(colorSlider.value),
            secondColor: Number.parseInt(secondColorSlider.value),
            size: Number.parseFloat(sizeSlider.value),
            speed: Number.parseInt(speedSlider.value)
        };
        launchFrom(Math.random() * firework.canvas.width * 2 / 3 + firework.canvas.width / 6, testRocket);
    }
    // test the saved object and launch them
    function testSavedRocket(rocketobject) {
        launchFrom(Math.random() * firework.canvas.width * 2 / 3 + firework.canvas.width / 6, rocketobject);
    }
    function testSelectedRocket(event) {
        // get the clicked element
        let target = event.currentTarget;
        //get the index, which row is clicked
        //2
        let index = Number.parseInt(target.getAttribute("data-index"));
        //get the rocket at index from rockets list
        let selectedRocket = allRockets[index];
        //test it
        testSavedRocket(selectedRocket);
    }
    async function deleteSelectedRocket(event) {
        // get the clicked element
        let target = event.currentTarget;
        //get the index, which row is clicked
        let index = Number.parseInt(target.getAttribute("data-index"));
        //get the rocket at index from rockets list
        let selectedRocket = allRockets[index];
        // delete the rocket from the rockets list
        await client.deleteRocket(selectedRocket._id);
        // refresh rockets, since its deleted
        getAllRockets();
    }
    // launch rocket from position x and add new rocket instances by passing rocketobject
    function launchFrom(posX, rocketObj) {
        // set the position of the rocket
        let pos = { x: posX, y: firework.canvas.height };
        // create new rocket instance
        let rocket = new firework.Rocket(pos, rocketObj);
        rocket.vel.y = Math.random() * -3 - 4;
        rocket.vel.x = Math.random() * 3 - 3;
        rockets.push(rocket);
    }
    function gameLoop() {
        setBackground();
        let queueRockets = [];
        for (var i = 0; i < rockets.length; i++) {
            // update and render
            rockets[i].animate();
            //explode in the upper 80% of screen
            if (rockets[i].pos.y < firework.canvas.height * 0.2) {
                firework.allScatters.push(...rockets[i].createScatter());
                // if the condition does not met, than queue the rockets
            }
            else {
                queueRockets.push(rockets[i]);
            }
        }
        rockets = queueRockets;
        //explosion
        for (var i = 0; i < firework.allScatters.length; i++) {
            firework.allScatters[i].animate();
            ;
        }
    }
    // get all rockets from server
    async function getAllRockets() {
        allRockets = await client.getAllRockets();
        printRockets();
    }
    //print all rockets
    function printRockets() {
        let rows = allRockets;
        //how many columns a row has
        var cols = ["_id", "name", "size", "color", "secondColor", "speed"];
        var headerRow = '';
        var bodyRows = '';
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            //create for each rocket a tr table row
            bodyRows += '<tr>';
            //cols = ["name", "siuze", "color"...]
            for (let j = 0; j < cols.length; j++) {
                let colName = cols[j];
                //add the elements row[colName] = id value, name value, etc.
                bodyRows += '<td>' + row[colName] + '</td>';
            }
            // add the action buttons after each row
            bodyRows += `<td>
      <a class="edit" data-index="${i}" title="Select" data-toggle="tooltip"><i class="fa fa-check"></i></a>
      <a class="delete"  data-index="${i}" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
      </td>`;
            // close the table row
            bodyRows += '</tr>';
        }
        rocketTable.innerHTML = bodyRows;
        let editElements = document.getElementsByClassName("edit");
        for (let i = 0; i < editElements.length; i++) {
            editElements[i].addEventListener("click", testSelectedRocket);
        }
        let deleteElements = document.getElementsByClassName("delete");
        for (let i = 0; i < deleteElements.length; i++) {
            deleteElements[i].addEventListener("click", deleteSelectedRocket);
        }
    }
    async function postRocket() {
        let testRocket = {
            name: rocketName.value,
            color: Number.parseInt(colorSlider.value),
            secondColor: Number.parseInt(secondColorSlider.value),
            size: Number.parseFloat(sizeSlider.value),
            speed: Number.parseInt(speedSlider.value)
        };
        let posted = await client.postRocket(testRocket);
        allRockets = await client.getAllRockets();
        getAllRockets();
        console.log(posted);
        return posted;
    }
    function setBackground() {
        firework.crc2.save();
        firework.crc2.fillStyle = "rgba(0, 0, 0, 0.15)";
        firework.crc2.fillRect(0, 0, firework.canvas.width, firework.canvas.height);
        var text = "Welcome!";
        firework.crc2.textAlign = "center";
        firework.crc2.fillStyle = "red";
        firework.crc2.font = "30px Comic Sans MS";
        firework.crc2.fillText(text, firework.canvas.width / 2, firework.canvas.height / 4);
    }
})(firework || (firework = {}));
var firework;
(function (firework) {
    // abstract class for rocket and scatter
    class Moveable {
        constructor(v) {
            this.pos = { x: 0, y: 0 };
            this.vel = { x: 0, y: 0 };
            this.pos = v;
            this.alpha = 1;
        }
        //if not faded and size not <= 1 the object still exists
        exists() {
            return this.alpha >= 0.1 && this.size >= 1;
        }
    }
    firework.Moveable = Moveable;
})(firework || (firework = {}));
var firework;
(function (firework) {
    class Scatter extends firework.Moveable {
        constructor(pos) {
            super(pos);
            this.pos = {
                x: pos ? pos.x : 0,
                y: pos ? pos.y : 0
            };
            this.vel = {
                x: 0,
                y: 0
            };
            this.shrink = 0.98;
            this.size = 0;
            this.resistance = firework.ScatterSize.MEDIUM;
            this.gravity = 0.1;
            this.alpha = 1;
            this.fade = 0;
        }
        draw() {
            if (!this.exists()) {
                return;
            }
            firework.crc2.save();
            firework.crc2.globalCompositeOperation = 'lighter';
            let x = this.pos.x, y = this.pos.y, r = this.size / 2;
            //create gradient
            let gradient = firework.crc2.createRadialGradient(x, y, 0.1, x, y, r);
            //set color from color variable
            gradient.addColorStop(0.5, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
            gradient.addColorStop(1, "hsla(" + this.secondColor + ", 100%, 50%, " + this.alpha + ")");
            firework.crc2.fillStyle = gradient;
            // move in a curvy way
            firework.crc2.beginPath();
            firework.crc2.arc(x, y, r, 0, Math.PI * 2, true);
            firework.crc2.closePath();
            firework.crc2.fill();
            firework.crc2.restore();
        }
        // update the values for the movement
        update() {
            this.vel.x *= this.resistance;
            this.vel.y *= this.resistance;
            // gravity down
            this.vel.y += this.gravity;
            // update position based on speed
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            // shrink
            this.size *= this.shrink;
            // fade out
            this.alpha -= this.fade;
        }
        // call both
        animate() {
            this.update();
            this.draw();
        }
    }
    firework.Scatter = Scatter;
})(firework || (firework = {}));
/// <reference path="scatter.ts" />
var firework;
(function (firework) {
    class Rocket extends firework.Moveable {
        constructor(v, rocketObj) {
            super(v);
            this.MAX_EXPLOSION = 100;
            this.MIN_EXPLOSION = 50;
            this.size = 4;
            this.scatterSize = rocketObj.size;
            this.speed = rocketObj.speed;
            this.color = rocketObj.color;
            this.secondColor = rocketObj.secondColor;
            this.scatters_ = [];
        }
        update() {
            // update position based on speed
            this.pos.x += this.vel.x * 1.5;
            this.pos.y += this.vel.y * this.speed;
        }
        draw() {
            //dont render if object does not exist anymore
            if (!this.exists()) {
                return;
            }
            let x = this.pos.x, y = this.pos.y, r = this.size;
            // create gradient color
            var gradient = firework.crc2.createRadialGradient(x, y, 0.1, x, y, r);
            gradient.addColorStop(0.1, "rgba(255, 255, 0 ," + this.alpha + ")");
            gradient.addColorStop(1, "rgba(255, 0, 0, " + this.alpha + ")");
            firework.crc2.fillStyle = gradient;
            firework.crc2.beginPath();
            // circle = rocket body
            firework.crc2.arc(x, y, this.size, 0, Math.PI * 2, true);
            firework.crc2.closePath();
            firework.crc2.fill();
            firework.crc2.restore();
        }
        createScatter() {
            //scatter amount random between max and min amount
            let count = Math.random() * this.MAX_EXPLOSION + this.MIN_EXPLOSION;
            //generate scatter objects for each rocket 
            for (let i = 0; i < count; i++) {
                let scatter = new firework.Scatter(this.pos);
                // area to fill the maximum angle
                let angle = Math.random() * Math.PI * 2;
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
        animate() {
            this.update();
            this.draw();
        }
    }
    firework.Rocket = Rocket;
})(firework || (firework = {}));
//# sourceMappingURL=build.js.map