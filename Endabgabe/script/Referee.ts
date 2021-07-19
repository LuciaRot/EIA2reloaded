namespace football {

    export class Referee {
        position: Vector;
        direction: Vector;
        speed: number;
        edge: boolean;

        constructor(_position: Vector) {
            /* console.log("hello"); */
            this.position = new Vector(_position.x, _position.y);
            this.edge = false;
        }

        draw(): void {
            console.log("hello");
            crc2Referee.beginPath();
            crc2Referee.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            crc2Referee.strokeStyle = "white";
            crc2Referee.fillStyle = "black";
            crc2Referee.lineWidth = 3;
            crc2Referee.fill();
            crc2Referee.stroke();
            crc2Referee.closePath();
        }

        move(_direction: Vector): void {
            _direction.scale(1 / 50);
            this.position.add(_direction);
           

        }       

        checkPosition(): void {
            if (this.position.x == 1000 * scale || this.position.x == 0) {
                this.edge = true;
            }
        }       
    }
}
