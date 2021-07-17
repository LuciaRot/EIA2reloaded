"use strict";
var football;
(function (football) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        subtract(_subtrahend) {
            this.x -= _subtrahend.x;
            this.y -= _subtrahend.y;
        }
    }
    football.Vector = Vector;
})(football || (football = {}));
//# sourceMappingURL=Vector.js.map