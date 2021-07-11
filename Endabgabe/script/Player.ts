namespace football {

    export class Player {
        position: Vector;
        direction: Vector;
        speed: number;
        precision: number;


        constructor(_position: Vector) {
            /* console.log("hello"); */
            this.position = _position;

        }

        draw(_color: string): void {
            crc2Players.beginPath();
            crc2Players.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            crc2Players.strokeStyle = _color;
            crc2Players.fillStyle = _color;
            crc2Players.fill();
            crc2Players.stroke();
            crc2Players.closePath();
        }

        move(_timeslice: number): void {
            this.direction = new Vector(clickX - this.position.x, clickY - this.position.y);
            let offset: Vector = new Vector(this.direction.x, this.direction.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }

    }
}
