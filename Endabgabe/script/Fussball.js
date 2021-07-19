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
    let minPrecisionInput;
    let maxPrecisionInput;
    let form;
    football.minSpeed = 1;
    football.maxSpeed = 5;
    let minPrecision = 1;
    let maxPrecision = 5;
    let scoreTeamOne;
    let scoreTeamTwo;
    let currentPlayer;
    let playerNumber;
    let playerSpeed;
    let playerPrecision;
    //Team Eins
    let x = [10, 150, 150, 150, 150, 425, 425, 425, 725, 750, 725];
    let y = [350, 125, 275, 425, 575, 175, 350, 525, 125, 350, 575];
    //Team Zwei
    let a = [990, 850, 850, 850, 850, 575, 575, 575, 275, 250, 275];
    let b = [350, 575, 425, 275, 125, 525, 350, 175, 575, 350, 125];
    //Spieler
    football.people = [];
    football.referees = [];
    football.i = 0;
    football.j = 6;
    //Spielstand
    let scores = [0, 0];
    let ballMovement;
    let playerMovement;
    let clicked;
    function handleLoad() {
        football.canvasBall = document.getElementById("ball");
        football.crc2Ball = football.canvasBall.getContext("2d");
        football.canvasPlayers = document.getElementById("players");
        football.crc2Players = football.canvasPlayers.getContext("2d");
        football.canvas = document.getElementById("field");
        football.crc2 = football.canvas.getContext("2d");
        football.canvasReferee = document.getElementById("referee");
        football.crc2Referee = football.canvas.getContext("2d");
        football.canvas.width = 1000 * football.scale;
        football.canvas.height = 700 * football.scale;
        football.canvasBall.width = 1000 * football.scale;
        football.canvasBall.height = 700 * football.scale;
        football.canvasPlayers.width = 1000 * football.scale;
        football.canvasPlayers.height = 700 * football.scale;
        football.canvasReferee.width = 1000 * football.scale;
        football.canvasReferee.height = 800 * football.scale;
        football.canvasBall.addEventListener("click", handleClick);
        createField();
        football.colors = ["black", "red"];
        placePlayersTeamOne();
        placePlayersTeamTwo();
        /* console.log(people); */
        newBall();
        placeSideReferee();
        colorOne = document.querySelector("input#colorOne");
        colorTwo = document.querySelector("input#colorTwo");
        minSpeedInput = document.querySelector("input#minspeed");
        maxSpeedInput = document.querySelector("input#maxspeed");
        minPrecisionInput = document.querySelector("input#minprecision");
        maxPrecisionInput = document.querySelector("input#maxprecision");
        form = document.querySelector("div#form");
        scoreTeamOne = document.querySelector("p#scoreOne");
        scoreTeamTwo = document.querySelector("p#scoreTwo");
        currentPlayer = document.querySelector("p#currentPlayer");
        playerNumber = document.querySelector("p#playerNumber");
        playerSpeed = document.querySelector("p#playerSpeed");
        playerPrecision = document.querySelector("p#playerPrecision");
        clicked = false;
        minSpeedInput.addEventListener("input", setMinSpeed);
        maxSpeedInput.addEventListener("input", setMaxSpeed);
        minPrecisionInput.addEventListener("input", setMinPrecision);
        maxPrecisionInput.addEventListener("input", setMaxPrecision);
        colorOne.addEventListener("input", setColor);
        colorTwo.addEventListener("input", setColor);
    }
    function placeSideReferee() {
        let position = new football.Vector(10 * football.scale, 1 * football.scale);
        let refereeOne = new football.Referee(position);
        refereeOne.draw();
        football.referees.splice(0, 0, refereeOne);
        let positionTwo = new football.Vector(10 * football.scale, 845 / football.scale);
        let refereeTwo = new football.Referee(positionTwo);
        refereeTwo.draw();
        football.referees.splice(1, 0, refereeTwo);
        console.log(football.referees);
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
    function setMinPrecision(_event) {
        let amount = _event.target.value;
        console.log(amount);
        minPrecision = parseFloat(amount);
        for (let player of football.people) {
            player.changePrecision(minPrecision, maxPrecision);
        }
    }
    function setMaxPrecision(_event) {
        let amount = _event.target.value;
        console.log(amount);
        maxPrecision = parseFloat(amount);
        for (let player of football.people) {
            player.changePrecision(minPrecision, maxPrecision);
        }
        console.log(football.people);
    }
    function handleClick(_event) {
        /* console.log("clicked"); */
        let rectangleB = football.canvasBall.getBoundingClientRect();
        football.clickX = Math.floor(_event.clientX - rectangleB.left);
        football.clickY = Math.floor(_event.clientY - rectangleB.top);
        console.log(football.clickX, football.clickY);
        if (clicked == true) {
            clicked = false;
        }
        for (let player of football.people) {
            player.checkClick(football.clickX, football.clickY);
            if (player.clicked == true) {
                playerNumber.innerHTML = "Player " + player.playerNumber;
                playerSpeed.innerHTML = "Speed " + player.speed;
                playerPrecision.innerHTML = "Precision " + player.precision;
                player.clicked = false;
                clicked = true;
            }
        }
        if (clicked == false) {
            playerNumber.innerHTML = "";
            playerSpeed.innerHTML = "";
            playerPrecision.innerHTML = "";
            ballMovement = setInterval(moveBall, 20);
            playerMovement = setInterval(movePlayer, 20);
        }
    }
    function setScore() {
        if (football.ball.goal == false) {
            let scoreOne = scores[0];
            let scoreTwo = scores[1];
            if (994 * football.scale <= football.positionBall.x && football.positionBall.x <= 1000 * football.scale && 315 * football.scale <= football.positionBall.y && football.positionBall.y <= 385 * football.scale) {
                scoreOne += 1;
                scores.splice(0, 1, scoreOne);
                scoreTeamOne.innerHTML = scoreOne.toString() + ":";
                football.ball.goal = true;
                clearInterval(ballMovement);
                newBall();
            }
            else if (0 <= football.positionBall.x && football.positionBall.x <= 6 * football.scale && 315 * football.scale << football.positionBall.y && football.positionBall.y <= 385 * football.scale) {
                scoreTwo += 1;
                scores.splice(1, 1, scoreTwo);
                scoreTeamTwo.innerHTML = scoreTwo.toString();
                football.ball.goal = true;
                clearInterval(ballMovement);
                newBall();
            }
        }
    }
    function newBall() {
        football.crc2Ball.clearRect(0, 0, football.canvasBall.width, football.canvasBall.height);
        football.positionBall = new football.Vector(500 * football.scale, 350 * football.scale);
        football.ball = new football.Ball(football.positionBall);
        football.ball.draw();
    }
    function moveBall() {
        let minX = football.clickX - 1;
        let maxX = football.clickX + 1;
        let minY = football.clickY - 1;
        let maxY = football.clickY + 1;
        football.crc2Ball.clearRect(0, 0, football.canvasBall.width, football.canvasBall.height);
        football.ball.move(1 / 50);
        football.ball.draw();
        /* console.log(positionBall, clickX, clickY); */
        if (minX <= football.positionBall.x && football.positionBall.x <= maxX && minY <= football.positionBall.y && football.positionBall.y <= maxY) {
            clearInterval(ballMovement);
            setScore();
        }
    }
    function movePlayer() {
        football.crc2Players.clearRect(0, 0, football.canvasPlayers.width, football.canvasPlayers.height);
        for (let player of football.people) {
            /* console.log(player.speed); */
            player.checkPosition();
            if (player.near == true) {
                player.move();
            }
            player.draw();
            player.checkCollision();
            if (player.atBall == true) {
                clearInterval(playerMovement);
                clearInterval(ballMovement);
                currentPlayer.innerHTML = "Player" + player.playerNumber;
                playerMovement = setInterval(movePlayerBack, 20);
            }
        }
    }
    function movePlayerBack() {
        football.crc2Players.clearRect(0, 0, football.canvasPlayers.width, football.canvasPlayers.height);
        for (let player of football.people) {
            /* console.log(player.speed); */
            if (player.atBall == false) {
                console.log("false");
                player.moveToStart();
                player.draw();
            }
            else if (player.atBall == true) {
                player.draw();
            }
            let currentPosition = new football.Vector(Math.floor(player.position.x), Math.floor(player.position.y));
            if (player.startPosition.x - 10 <= currentPosition.x && currentPosition.x <= player.startPosition.x + 10 && player.startPosition.y - 10 <= currentPosition.y && currentPosition.y <= player.startPosition.y + 10) {
                player.atStartposition = true;
            }
            let k = 0;
            for (let player of football.people) {
                if (player.atStartposition == true) {
                    k += 1;
                }
            }
            if (k == 21) {
                clearInterval(playerMovement);
                player.atBall = false;
                player.near = false;
            }
        }
    }
    function placePlayersTeamOne() {
        for (let i = 0; i < 11; i++) {
            football.playerPosition = new football.Vector(x[i] * football.scale, y[i] * football.scale);
            let player = new football.Player(football.playerPosition, football.colors[0], i);
            if (player.speed == undefined) {
                player.speed = Math.floor(Math.random() * (football.maxSpeed - football.minSpeed + 1) + football.minSpeed) / 200;
            }
            if (player.precision == undefined) {
                player.precision = Math.floor(Math.random() * (maxPrecision - minPrecision + 1) + minPrecision);
            }
            player.draw();
            football.people.splice(i, 1, player);
        }
        console.log(football.people);
    }
    function placePlayersTeamTwo() {
        for (let i = 11; i < 22; i++) {
            football.playerPosition = new football.Vector(a[i - 11] * football.scale, b[i - 11] * football.scale);
            let player = new football.Player(football.playerPosition, football.colors[1], i);
            if (player.speed == undefined) {
                player.speed = Math.floor(Math.random() * (football.maxSpeed - football.minSpeed + 1) + football.minSpeed) / 200;
            }
            if (player.precision == undefined) {
                player.precision = Math.floor(Math.random() * (maxPrecision - minPrecision + 1) + minPrecision);
            }
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