namespace football {

        export class Ball {
                positionX: number;
                positionY: number;
                velocityX: number;
                velocityY: number;

                constructor(_positionX: number, _positionY: number) {
                        console.log("hello");
                        this.positionX = _positionX;
                        this.positionY = _positionY;
                        
                }

                draw(): void {
                        crc2.save();
                        crc2.beginPath();
                        crc2.arc(this.positionX, this.positionY, 7, 0, 2 * Math.PI);
                        crc2.strokeStyle = "black";
                        crc2.fillStyle = "white";
                        crc2.lineWidth = 2;
                        crc2.fill();
                        crc2.stroke();
                        crc2.closePath();
                        crc2.restore();
                }

                move(_positionX: number, _positionY: number): void {
                        this.positionX = _positionX;
                        this.positionY = _positionY;
                }

        }













}


