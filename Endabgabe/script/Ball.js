"use strict";
var football;
(function (football) {
    class Ball {
        constructor(_positionX, _positionY) {
            console.log("hello");
            this.positionX = _positionX;
            this.positionY = _positionY;
        }
        draw() {
            football.crc2.save();
            football.crc2.beginPath();
            football.crc2.arc(this.positionX, this.positionY, 7, 0, 2 * Math.PI);
            football.crc2.strokeStyle = "black";
            football.crc2.fillStyle = "white";
            football.crc2.lineWidth = 2;
            football.crc2.fill();
            football.crc2.stroke();
            football.crc2.closePath();
            football.crc2.restore();
        }
        move(_positionX, _positionY) {
            this.positionX = _positionX;
            this.positionY = _positionY;
        }
    }
    football.Ball = Ball;
})(football || (football = {}));
//# sourceMappingURL=Ball.js.map