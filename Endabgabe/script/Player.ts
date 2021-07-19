namespace football {

    export class Player {
        position: Vector;
        direction: Vector;
        speed: number;
        precision: number;
        color: string;
        playerNumber: number;
        distance: number;
        angle: number;
        near: boolean = false;
        atBall: boolean = false;
        startPosition: Vector;
        atStartposition: boolean;
        clicked: boolean = false;


        constructor(_position: Vector, _color: string, _number: number) {
            /* console.log("hello"); */
            this.position = new Vector(_position.x, _position.y);
            this.startPosition = new Vector(_position.x, _position.y);
            this.color = _color;
            this.playerNumber = _number;
            this.atStartposition = true;

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
            let offset: Vector = new Vector(this.direction.x, this.direction.y);
            offset.scale(this.speed);
            this.position.add(offset);
            this.atStartposition = false;
            console.log(this.direction, this.distance, this.near, this.playerNumber, this.position, this.precision, this.speed, this.startPosition);


        }

        moveToStart(): void {
            this.direction = new Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y);
            let offset: Vector = new Vector(this.direction.x, this.direction.y);
            console.log(offset);

            offset.scale(this.speed);
            this.position.add(offset);
            console.log(this.direction, this.distance, this.near, this.playerNumber, this.position, this.precision, this.speed, this.startPosition);

        }

        changeSpeed(_min: number, _max: number): void {
            this.speed = Math.floor(Math.random() * (_max - _min + 1) + _min) / 200;
        }

        changePrecision(_min: number, _max: number): void {
            this.precision = Math.floor(Math.random() * (_max - _min + 1) + _min);
        }

        checkPosition(): void {
            let shoot: Vector = new Vector(positionBall.x - this.position.x, positionBall.y - this.position.y);
            this.distance = Math.sqrt(shoot.x * shoot.x + shoot.y * shoot.y);

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

        checkCollision(): void {
            
            let distanceBall: Vector = new Vector(positionBall.x - this.position.x, positionBall.y - this.position.y);
            let distance: number = Math.sqrt(distanceBall.x * distanceBall.x + distanceBall.y * distanceBall.y);
            if (distance <= 5) {
                this.atBall = true;
            }
        }

        checkClick(_x: number, _y: number): void {
            let distanceClick: Vector = new Vector(_x - this.position.x, _y - this.position.y);
            let distance: number = Math.sqrt(distanceClick.x * distanceClick.x + distanceClick.y * distanceClick.y);
            if (distance <= 10) {
                this.clicked = true;
            }
        }

    }
}
