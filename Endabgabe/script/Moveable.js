"use strict";
var football;
(function (football) {
    class Moveable {
        constructor(_position) {
            this.position = new football.Vector(_position.x, _position.y);
        }
    }
    football.Moveable = Moveable;
})(football || (football = {}));
//# sourceMappingURL=Moveable.js.map