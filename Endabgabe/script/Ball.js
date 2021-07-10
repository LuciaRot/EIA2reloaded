"use strict";
var football;
(function (football) {
    class Ball {
        constructor(_position) {
            console.log("hello");
            /* this.velocity = new Vector(Math.floor(Math.random() * 100), Math.floor(Math.random() * 200)); */
            this.position = _position;
        }
        draw() {
            football.crc2.save();
            football.crc2.beginPath();
            football.crc2.arc(this.position.x, this.position.y, 7, 0, 2 * Math.PI);
            football.crc2.strokeStyle = "black";
            football.crc2.fillStyle = "white";
            football.crc2.lineWidth = 2;
            football.crc2.fill();
            football.crc2.stroke();
            football.crc2.closePath();
            football.crc2.restore();
        }
        move(_timeslice) {
            this.direction = new football.Vector(football.clickX - this.position.x, football.clickY - this.position.y);
            let offset = new football.Vector(this.direction.x, this.direction.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    football.Ball = Ball;
})(football || (football = {}));
//# sourceMappingURL=Ball.js.map