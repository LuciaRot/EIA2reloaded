"use strict";
var football;
(function (football) {
    window.addEventListener("load", handleLoad);
    football.scale = window.devicePixelRatio;
    //Team Eins
    let x = [10, 150, 150, 150, 150, 425, 425, 425, 725, 750, 725];
    let y = [350, 125, 275, 425, 575, 175, 350, 525, 125, 350, 575];
    //Team Zwei
    let a = [990, 850, 850, 850, 850, 575, 575, 575, 275, 250, 275];
    let b = [350, 575, 425, 275, 125, 525, 350, 175, 575, 350, 125];
    let ball;
    function handleLoad() {
        football.canvas = document.querySelector("canvas");
        football.crc2 = football.canvas.getContext("2d");
        football.canvas.width = 1000 * football.scale;
        football.canvas.height = 700 * football.scale;
        football.canvas.addEventListener("click", handleClick);
        createField();
        placePlayersTeamOne();
        placePlayersTeamTwo();
        let startPos = new football.Vector(500 * football.scale, 350 * football.scale);
        ball = new football.Ball(startPos);
        ball.draw();
    }
    function handleClick(_event) {
        console.log("clicked");
        let rectangle = football.canvas.getBoundingClientRect();
        football.clickX = _event.clientX - rectangle.left;
        football.clickY = _event.clientY - rectangle.top;
        setInterval(moveBall, 20);
    }
    function moveBall() {
        ball.move(1 / 50);
        ball.draw();
    }
    function placePlayersTeamOne() {
        for (let i = 0; i < 11; i++) {
            football.crc2.beginPath();
            football.crc2.arc(x[i] * football.scale, y[i] * football.scale, 10, 0, 2 * Math.PI);
            football.crc2.strokeStyle = "black";
            football.crc2.fillStyle = "black";
            football.crc2.fill();
            football.crc2.stroke();
            football.crc2.closePath();
        }
    }
    function placePlayersTeamTwo() {
        for (let i = 0; i < 11; i++) {
            football.crc2.beginPath();
            football.crc2.arc(a[i] * football.scale, b[i] * football.scale, 10, 0, 2 * Math.PI);
            football.crc2.strokeStyle = "red";
            football.crc2.fillStyle = "red";
            football.crc2.fill();
            football.crc2.stroke();
            football.crc2.closePath();
        }
    }
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