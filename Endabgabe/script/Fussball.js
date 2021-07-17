"use strict";
var football;
(function (football) {
    window.addEventListener("load", handleLoad);
    football.scale = window.devicePixelRatio;
    //Elemente der HTML Datei
    let colorOne;
    let colorTwo;
    let minSpeedInput;
    let maxSpeedInput;
    let form;
    //Team Eins
    let x = [10, 150, 150, 150, 150, 425, 425, 425, 725, 750, 725];
    let y = [350, 125, 275, 425, 575, 175, 350, 525, 125, 350, 575];
    //Team Zwei
    let a = [990, 850, 850, 850, 850, 575, 575, 575, 275, 250, 275];
    let b = [350, 575, 425, 275, 125, 525, 350, 175, 575, 350, 125];
    //Spieler
    football.people = [];
    football.i = 0;
    football.j = 6;
    function handleLoad() {
        football.canvasBall = document.getElementById("ball");
        football.crc2Ball = football.canvasBall.getContext("2d");
        football.canvasPlayers = document.getElementById("players");
        football.crc2Players = football.canvasPlayers.getContext("2d");
        football.canvas = document.getElementById("field");
        football.crc2 = football.canvas.getContext("2d");
        football.canvas.width = 1000 * football.scale;
        football.canvas.height = 700 * football.scale;
        football.canvasBall.width = 1000 * football.scale;
        football.canvasBall.height = 700 * football.scale;
        football.canvasPlayers.width = 1000 * football.scale;
        football.canvasPlayers.height = 700 * football.scale;
        football.canvasBall.addEventListener("click", handleClick);
        createField();
        football.minSpeed = 100;
        football.maxSpeed = 200;
        football.colors = ["black", "red"];
        placePlayersTeamOne();
        placePlayersTeamTwo();
        /* console.log(people); */
        football.positionBall = new football.Vector(500 * football.scale, 350 * football.scale);
        football.ball = new football.Ball(football.positionBall);
        football.ball.draw();
        colorOne = document.querySelector("input#colorOne");
        colorTwo = document.querySelector("input#colorTwo");
        minSpeedInput = document.querySelector("input#minspeed");
        maxSpeedInput = document.querySelector("input#maxspeed");
        form = document.querySelector("div#form");
        minSpeedInput.addEventListener("input", setMinSpeed);
        maxSpeedInput.addEventListener("input", setMaxSpeed);
        colorOne.addEventListener("input", setColor);
        colorTwo.addEventListener("input", setColor);
        form.addEventListener("change", handleChange);
    }
    function setColor(_event) {
        let color = _event.target.value;
        /*  console.log(_event.target);
         console.log(colorOne); */
        if (_event.target == colorOne) {
            for (let i = 0; i < 11; i++) {
                football.colors[0] = color;
                let player = football.people[i];
                player.changeColor(color);
                console.log(player.color);
                placePlayersTeamOne();
            }
        }
        else {
            football.colors[1] = color;
            for (let i = 11; i < 22; i++) {
                football.colors[1] = color;
                let player = football.people[i];
                player.changeColor(color);
                placePlayersTeamTwo();
            }
        }
    }
    function setMinSpeed(_event) {
        let amount = _event.target.value;
        console.log(amount);
        football.minSpeed = parseFloat(amount);
        for (let player of football.people) {
            player.changeSpeed(football.minSpeed, football.maxSpeed);
        }
    }
    function setMaxSpeed(_event) {
        let amount = _event.target.value;
        console.log(amount);
        football.maxSpeed = parseFloat(amount);
        for (let player of football.people) {
            player.changeSpeed(football.minSpeed, football.maxSpeed);
        }
    }
    function handleChange(_event) {
        console.log(_event);
    }
    function handleClick(_event) {
        /* console.log("clicked"); */
        let rectangle = football.canvasBall.getBoundingClientRect();
        football.clickX = Math.floor(_event.clientX - rectangle.left);
        football.clickY = Math.floor(_event.clientY - rectangle.top);
        console.log(football.clickX, football.clickY);
        setInterval(moveBall, 20);
        /* console.log(people); */
        for (let player of football.people) {
            player.checkPosition();
            football.crc2Players.clearRect(0, 0, football.canvasPlayers.width, football.canvasPlayers.height);
            if (player.near == true) {
                player.move();
            }
            player.draw();
        }
    }
    function moveBall() {
        football.crc2Ball.clearRect(0, 0, football.canvasBall.width, football.canvasBall.height);
        /*  if (clickX == positionBall.x && clickY == positionBall.y) {
             clearInterval();
         } */
        football.ball.move(1 / 50);
        football.ball.draw();
    }
    function movePlayer() {
        let playerX = football.people[football.j].position.x - 7;
        let playerY = football.people[football.j].position.y - 7;
        let playerXTwo = football.people[football.j].position.x + 7;
        let playerYTwo = football.people[football.j].position.y + 7;
        let distance = new football.Vector(football.positionBall.x - football.people[football.j].position.x, football.positionBall.y - football.people[football.j].position.y);
        console.log(Math.sqrt(distance.x * distance.x + distance.y * distance.y));
        if (Math.sqrt(distance.x * distance.x + distance.y * distance.y) <= 300 * football.scale) {
            console.log("near");
            football.crc2Players.clearRect(playerX, playerY, playerXTwo, playerYTwo);
            football.people[football.j].move();
            football.people[football.j].draw();
        }
    }
    function placePlayersTeamOne() {
        for (let i = 0; i < 11; i++) {
            football.playerPosition = new football.Vector(x[i] * football.scale, y[i] * football.scale);
            let player = new football.Player(football.playerPosition, football.colors[0], i);
            player.draw();
            football.people.splice(i, 1, player);
        }
        console.log(football.people);
    }
    function placePlayersTeamTwo() {
        for (let i = 11; i < 22; i++) {
            football.playerPosition = new football.Vector(a[i - 11] * football.scale, b[i - 11] * football.scale);
            let player = new football.Player(football.playerPosition, football.colors[1], i);
            player.draw();
            football.people.splice(i, 1, player);
        }
        /* console.log(people); */
    }
    /* function showStats(): void {
        console.log(people[i]);
    } */
    function createField() {
        //Mittellinie
        football.crc2.beginPath();
        football.crc2.moveTo(500 * football.scale, 0);
        football.crc2.lineTo(500 * football.scale, 700 * football.scale);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Spielfeldumrandung
        football.crc2.beginPath();
        football.crc2.moveTo(0, 0);
        football.crc2.lineTo(1000 * football.scale, 0);
        football.crc2.lineTo(1000 * football.scale, 700 * football.scale);
        football.crc2.lineTo(0, 700 * football.scale);
        football.crc2.lineTo(0, 0);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 8;
        football.crc2.stroke();
        football.crc2.closePath();
        //Mittelkreis
        football.crc2.beginPath();
        football.crc2.arc(500 * football.scale, 350 * football.scale, 90, 0, 2 * Math.PI);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Tor links
        football.crc2.beginPath();
        football.crc2.moveTo(0, 315 * football.scale);
        football.crc2.lineTo(6 * football.scale, 315 * football.scale);
        football.crc2.moveTo(0, 385 * football.scale);
        football.crc2.lineTo(6 * football.scale, 385 * football.scale);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Torraum links
        football.crc2.beginPath();
        football.crc2.moveTo(0, 260 * football.scale);
        football.crc2.lineTo(55 * football.scale, 260 * football.scale);
        football.crc2.lineTo(55 * football.scale, 440 * football.scale);
        football.crc2.lineTo(0, 440 * football.scale);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Strafraum links
        football.crc2.beginPath();
        football.crc2.moveTo(0, 150 * football.scale);
        football.crc2.lineTo(165 * football.scale, 150 * football.scale);
        football.crc2.lineTo(165 * football.scale, 550 * football.scale);
        football.crc2.lineTo(0, 550 * football.scale);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Tor rechts
        football.crc2.beginPath();
        football.crc2.moveTo(1000 * football.scale, 315 * football.scale);
        football.crc2.lineTo(994 * football.scale, 315 * football.scale);
        football.crc2.moveTo(1000 * football.scale, 385 * football.scale);
        football.crc2.lineTo(994 * football.scale, 385 * football.scale);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Torraum rechts
        football.crc2.beginPath();
        football.crc2.moveTo(1000 * football.scale, 260 * football.scale);
        football.crc2.lineTo(945 * football.scale, 260 * football.scale);
        football.crc2.lineTo(945 * football.scale, 440 * football.scale);
        football.crc2.lineTo(1000 * football.scale, 440 * football.scale);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Strafraum rechts
        football.crc2.beginPath();
        football.crc2.moveTo(1000 * football.scale, 150 * football.scale);
        football.crc2.lineTo(835 * football.scale, 150 * football.scale);
        football.crc2.lineTo(835 * football.scale, 550 * football.scale);
        football.crc2.lineTo(1000 * football.scale, 550 * football.scale);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Mittelpunkt
        football.crc2.beginPath();
        football.crc2.arc(500 * football.scale, 350 * football.scale, 3, 0, 2 * Math.PI);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Elfer links
        football.crc2.beginPath();
        football.crc2.arc(110 * football.scale, 350 * football.scale, 2, 0, 2 * Math.PI);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
        //Elfer rechts
        football.crc2.beginPath();
        football.crc2.arc(890 * football.scale, 350 * football.scale, 2, 0, 2 * Math.PI);
        football.crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        football.crc2.lineWidth = 4;
        football.crc2.stroke();
        football.crc2.closePath();
    }
})(football || (football = {}));
//# sourceMappingURL=Fussball.js.map