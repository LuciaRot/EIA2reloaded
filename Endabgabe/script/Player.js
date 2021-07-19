"use strict";
var football;
(function (football) {
    class Player {
        constructor(_position, _color, _number) {
            this.near = false;
            this.atBall = false;
            this.clicked = false;
            /* console.log("hello"); */
            this.position = new football.Vector(_position.x, _position.y);
            this.startPosition = new football.Vector(_position.x, _position.y);
            this.color = _color;
            this.playerNumber = _number;
            this.atStartposition = true;
        }
        draw() {
            football.crc2Players.beginPath();
            football.crc2Players.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            football.crc2Players.strokeStyle = this.color;
            football.crc2Players.fillStyle = this.color;
            football.crc2Players.fill();
            football.crc2Players.stroke();
            football.crc2Players.closePath();
        }
        move() {
            this.direction = new football.Vector(football.positionBall.x - this.position.x, football.positionBall.y - this.position.y);
            let offset = new football.Vector(this.direction.x, this.direction.y);
            offset.scale(this.speed);
            this.position.add(offset);
            this.atStartposition = false;
            console.log(this.direction, this.distance, this.near, this.playerNumber, this.position, this.precision, this.speed, this.startPosition);
        }
        moveToStart() {
            this.direction = new football.Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y);
            let offset = new football.Vector(this.direction.x, this.direction.y);
            console.log(offset);
            offset.scale(this.speed);
            this.position.add(offset);
            console.log(this.direction, this.distance, this.near, this.playerNumber, this.position, this.precision, this.speed, this.startPosition);
        }
        changeSpeed(_min, _max) {
            this.speed = Math.floor(Math.random() * (_max - _min + 1) + _min) / 200;
        }
        changePrecision(_min, _max) {
            this.precision = Math.floor(Math.random() * (_max - _min + 1) + _min);
        }
        checkPosition() {
            let shoot = new football.Vector(football.positionBall.x - this.position.x, football.positionBall.y - this.position.y);
            this.distance = Math.sqrt(shoot.x * shoot.x + shoot.y * shoot.y);
            if (Math.floor(this.distance) <= 300 * football.scale) {
                this.near = true;
            }
            else {
                this.near = false;
            }
        }
        changeColor(_newColor) {
            this.color = _newColor;
        }
        checkCollision() {
            let distanceBall = new football.Vector(football.positionBall.x - this.position.x, football.positionBall.y - this.position.y);
            let distance = Math.sqrt(distanceBall.x * distanceBall.x + distanceBall.y * distanceBall.y);
            if (distance <= 5) {
                this.atBall = true;
            }
        }
        checkClick(_x, _y) {
            let distanceClick = new football.Vector(_x - this.position.x, _y - this.position.y);
            let distance = Math.sqrt(distanceClick.x * distanceClick.x + distanceClick.y * distanceClick.y);
            if (distance <= 10) {
                this.clicked = true;
            }
        }
    }
    football.Player = Player;
})(football || (football = {}));
//# sourceMappingURL=Player.js.map