namespace football {

    export class Moveable {
        public position: Vector;
        public direction: Vector;
        public speed: number;



        constructor(_position: Vector) {
            this.position = new Vector(_position.x, _position.y);
            

        }
        
        
    }
}
