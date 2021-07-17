"use strict";
var football;
(function (football) {
    class Player {
        constructor(_position, _color, _number) {
            this.speed = Math.floor(Math.random() * (football.maxSpeed - football.minSpeed + 1) + football.minSpeed);
            this.near = false;
            /* console.log("hello"); */
            this.position = _position;
            this.color = _color;
            this.playerNumber = _number;
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
            this.direction.scale(this.speed);
            this.position.add(this.direction);
        }
        changeSpeed(_min, _max) {
            this.speed = Math.floor(Math.random() * (_max - _min + 1) + _min);
        }
        checkPosition() {
            let shoot = new football.Vector(football.positionBall.x - this.position.x, football.positionBall.y - this.position.y);
            this.distance = Math.sqrt(shoot.x * shoot.x + shoot.y * shoot.y);
            let rad = Math.atan2(shoot.x, shoot.y);
            this.angle = rad / Math.PI * 180;
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
    }
    football.Player = Player;
})(football || (football = {}));
//# sourceMappingURL=Player.js.map