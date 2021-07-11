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
    //Spieler
    let people = [];
    let colors = ["black", "red"];
    let playerPosition;
    function handleLoad() {
        football.canvasBall = document.getElementById("ball");
        football.crc2Ball = football.canvasBall.getContext("2d");
        football.canvasPlayers = document.getElementById("players");
        football.crc2Players = football.canvasBall.getContext("2d");
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
        placePlayersTeamOne(0);
        placePlayersTeamTwo(0);
        football.positionBall = new football.Vector(500 * football.scale, 350 * football.scale);
        football.ball = new football.Ball(football.positionBall);
        football.ball.draw();
    }
    function handleClick(_event) {
        console.log("clicked");
        let rectangle = football.canvasBall.getBoundingClientRect();
        football.clickX = _event.clientX - rectangle.left;
        football.clickY = _event.clientY - rectangle.top;
        setInterval(moveBall, 20);
    }
    function moveBall() {
        football.crc2Ball.clearRect(0, 0, football.canvasBall.width, football.canvasBall.height);
        football.ball.move(1 / 50);
        football.ball.draw();
    }
    function placePlayersTeamOne(_s) {
        let players = [];
        for (let i = 0; i < 11; i++) {
            playerPosition = new football.Vector(x[_s] * football.scale, y[_s] * football.scale);
            let player = new football.Player(playerPosition);
            player.draw(colors[0]);
            players.splice(_s, 0, _s);
            _s += 1;
        }
        people.splice(0, 0, players);
        console.log(people[0]);
    }
    function placePlayersTeamTwo(_t) {
        let players = [];
        for (let i = 0; i < 11; i++) {
            playerPosition = new football.Vector(a[_t] * football.scale, b[_t] * football.scale);
            let player = new football.Player(playerPosition);
            player.draw(colors[1]);
            players.splice(_t, 0, _t);
            _t += 1;
        }
        people.splice(1, 0, players);
        console.log(people[1]);
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