"use strict";
var football;
(function (football) {
    class Player {
        constructor(_position) {
            /* console.log("hello"); */
            this.position = _position;
        }
        draw(_color) {
            football.crc2Players.beginPath();
            football.crc2Players.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            football.crc2Players.strokeStyle = _color;
            football.crc2Players.fillStyle = _color;
            football.crc2Players.fill();
            football.crc2Players.stroke();
            football.crc2Players.closePath();
        }
        move(_timeslice) {
            this.direction = new football.Vector(football.clickX - this.position.x, football.clickY - this.position.y);
            let offset = new football.Vector(this.direction.x, this.direction.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    football.Player = Player;
})(football || (football = {}));
//# sourceMappingURL=Player.js.map