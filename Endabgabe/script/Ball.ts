namespace football {

        export class Ball {
                position: Vector;
                direction: Vector;


                constructor(_position: Vector) {
                        console.log("hello");
                        /* this.velocity = new Vector(Math.floor(Math.random() * 100), Math.floor(Math.random() * 200)); */
                        this.position = _position;
                        
                }

                draw(): void {
                        crc2.save();
                        crc2.beginPath();
                        crc2.arc(this.position.x, this.position.y, 7, 0, 2 * Math.PI);
                        crc2.strokeStyle = "black";
                        crc2.fillStyle = "white";
                        crc2.lineWidth = 2;
                        crc2.fill();
                        crc2.stroke();
                        crc2.closePath();
                        crc2.restore();
                }

                move(_timeslice: number): void {
                        this.direction = new Vector(clickX - this.position.x, clickY - this.position.y);
                        let offset: Vector = new Vector(this.direction.x, this.direction.y);
                        offset.scale(_timeslice);
                        this.position.add(offset);
                }

        }













}


