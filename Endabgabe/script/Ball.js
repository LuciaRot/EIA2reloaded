"use strict";
var football;
(function (football) {
    class Ball {
        constructor(_position) {
            /* console.log("hello"); */
            /* this.velocity = new Vector(Math.floor(Math.random() * 100), Math.floor(Math.random() * 200)); */
            this.position = _position;
        }
        draw() {
            /* console.log(crc2Ball); */
            let newPosition = new football.Vector(Math.floor(this.position.x), Math.floor(this.position.y));
            football.crc2Ball.save();
            football.crc2Ball.beginPath();
            football.crc2Ball.arc(this.position.x, this.position.y, 7, 0, 2 * Math.PI);
            football.crc2Ball.strokeStyle = "black";
            football.crc2Ball.fillStyle = "white";
            football.crc2Ball.lineWidth = 2;
            football.crc2Ball.fill();
            football.crc2Ball.stroke();
            football.crc2Ball.closePath();
            football.crc2Ball.restore();
            football.positionBall = newPosition;
            /* console.log(positionBall); */
        }
        move(_timeslice) {
            this.direction = new football.Vector(football.clickX - this.position.x, football.clickY - this.position.y);
            let offset = new football.Vector(this.direction.x, this.direction.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            football.positionBall = this.position;
        }
    }
    football.Ball = Ball;
})(football || (football = {}));
//# sourceMappingURL=Ball.js.map