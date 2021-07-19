"use strict";
var football;
(function (football) {
    class Referee {
        constructor(_position) {
            /* console.log("hello"); */
            this.position = new football.Vector(_position.x, _position.y);
            this.edge = false;
        }
        draw() {
            console.log("hello");
            football.crc2Referee.beginPath();
            football.crc2Referee.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            football.crc2Referee.strokeStyle = "white";
            football.crc2Referee.fillStyle = "black";
            football.crc2Referee.lineWidth = 3;
            football.crc2Referee.fill();
            football.crc2Referee.stroke();
            football.crc2Referee.closePath();
        }
        move(_direction) {
            _direction.scale(1 / 50);
            this.position.add(_direction);
        }
        checkPosition() {
            if (this.position.x == 1000 * football.scale || this.position.x == 0) {
                this.edge = true;
            }
        }
    }
    football.Referee = Referee;
})(football || (football = {}));
//# sourceMappingURL=Referee.js.map