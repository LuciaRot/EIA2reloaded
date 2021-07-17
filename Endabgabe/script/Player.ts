namespace football {

    export class Player {
        position: Vector;
        direction: Vector;
        speed: number = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed);
        precision: number;
        color: string;
        playerNumber: number;
        distance: number;
        angle: number;
        near: boolean = false;


        constructor(_position: Vector, _color: string, _number: number) {
            /* console.log("hello"); */
            this.position = _position;
            this.color = _color;
            this.playerNumber = _number;

        }

        draw(): void {
            crc2Players.beginPath();
            crc2Players.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            crc2Players.strokeStyle = this.color;
            crc2Players.fillStyle = this.color;
            crc2Players.fill();
            crc2Players.stroke();
            crc2Players.closePath();
        }

        move(): void {
            this.direction = new Vector(positionBall.x - this.position.x, positionBall.y - this.position.y);
            this.direction.scale(this.speed);
            this.position.add(this.direction);
        }

        changeSpeed(_min: number, _max: number): void {
            this.speed = Math.floor(Math.random() * (_max - _min + 1) + _min);
        }

        checkPosition(): void {
            let shoot: Vector = new Vector(positionBall.x - this.position.x, positionBall.y - this.position.y);
            this.distance = Math.sqrt(shoot.x * shoot.x + shoot.y * shoot.y);
            let rad: number = Math.atan2(shoot.x, shoot.y);
            this.angle = rad / Math.PI * 180;
            if (Math.floor(this.distance) <= 300 * scale) {
                this.near = true;
            }
            else {
                this.near = false;
            }
        }

        changeColor(_newColor: string): void {
            this.color = _newColor;
        }

    }
}
