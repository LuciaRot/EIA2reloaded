namespace football {

        export class Ball {
                position: Vector;
                direction: Vector;


                constructor(_position: Vector) {
                        /* console.log("hello"); */
                        /* this.velocity = new Vector(Math.floor(Math.random() * 100), Math.floor(Math.random() * 200)); */
                        this.position = _position;
                        
                }

                draw(): void {
                        /* console.log(crc2Ball); */
                        let newPosition: Vector = new Vector(Math.floor(this.position.x), Math.floor(this.position.y));
                        crc2Ball.save();
                        crc2Ball.beginPath();
                        crc2Ball.arc(this.position.x, this.position.y, 7, 0, 2 * Math.PI);
                        crc2Ball.strokeStyle = "black";
                        crc2Ball.fillStyle = "white";
                        crc2Ball.lineWidth = 2;
                        crc2Ball.fill();
                        crc2Ball.stroke();
                        crc2Ball.closePath();
                        crc2Ball.restore();
                        positionBall = newPosition;
                        /* console.log(positionBall); */
                }

                move(_timeslice: number): void {
                        this.direction = new Vector(clickX - this.position.x, clickY - this.position.y);
                        let offset: Vector = new Vector(this.direction.x, this.direction.y);
                        offset.scale(_timeslice);
                        this.position.add(offset);
                        positionBall = this.position;
                }

        }













}


