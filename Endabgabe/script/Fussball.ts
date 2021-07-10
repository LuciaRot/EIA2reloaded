namespace football {

    window.addEventListener("load", handleLoad);
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let scale: number = window.devicePixelRatio;

    //Team Eins
    let x: number[] = [10, 150, 150, 150, 150, 425, 425, 425, 725, 750, 725];
    let y: number[] = [350, 125, 275, 425, 575, 175, 350, 525, 125, 350, 575];

    //Team Zwei
    let a: number[] = [990, 850, 850, 850, 850, 575, 575, 575, 275, 250, 275];
    let b: number[] = [350, 575, 425, 275, 125, 525, 350, 175, 575, 350, 125];

    export let clickX: number;
    export let clickY: number;

    let ball: Ball;
    

    function handleLoad(): void {
        
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.width = 1000 * scale;
        canvas.height = 700 * scale;
        canvas.addEventListener("click", handleClick);
        createField();
        placePlayersTeamOne();
        placePlayersTeamTwo();
        ball = new Ball(500 * scale, 350 * scale);
        ball.draw();

    }

    function handleClick(_event: MouseEvent): void {

        let rectangle = canvas.getBoundingClientRect();
        console.log(rectangle);
        clickX = _event.clientX - rectangle.left;
        clickY = _event.clientY - rectangle.top;
        console.log(clickX , clickY);
        ball.move(clickX, clickY);
        ball.draw();
    }

    function placePlayersTeamOne(): void {

        for (let i: number = 0; i < 11; i++) {
            crc2.beginPath();
            crc2.arc(x[i] * scale, y[i] * scale, 10, 0, 2 * Math.PI);
            crc2.strokeStyle = "black";
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
        }

    }

    function placePlayersTeamTwo(): void {

        for (let i: number = 0; i < 11; i++) {
            crc2.beginPath();
            crc2.arc(a[i] * scale, b[i] * scale, 10, 0, 2 * Math.PI);
            crc2.strokeStyle = "red";
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
        }
    }

    function createField(): void {
        //Mittellinie
        crc2.beginPath();
        crc2.moveTo(500 * scale, 0);
        crc2.lineTo(500 * scale, 700 * scale);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Spielfeldumrandung
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(1000 * scale, 0);
        crc2.lineTo(1000 * scale, 700 * scale);
        crc2.lineTo(0, 700 * scale);
        crc2.lineTo(0, 0);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 8;
        crc2.stroke();
        crc2.closePath();

        //Mittelkreis
        crc2.beginPath();
        crc2.arc(500 * scale, 350 * scale, 90, 0, 2 * Math.PI);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Tor links
        crc2.beginPath();
        crc2.moveTo(0, 315 * scale);
        crc2.lineTo(6 * scale, 315 * scale);
        crc2.moveTo(0, 385 * scale);
        crc2.lineTo(6 * scale, 385 * scale);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Torraum links
        crc2.beginPath();
        crc2.moveTo(0, 260 * scale);
        crc2.lineTo(55 * scale, 260 * scale);
        crc2.lineTo(55 * scale, 440 * scale);
        crc2.lineTo(0, 440 * scale);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Strafraum links
        crc2.beginPath();
        crc2.moveTo(0, 150 * scale);
        crc2.lineTo(165 * scale, 150 * scale);
        crc2.lineTo(165 * scale, 550 * scale);
        crc2.lineTo(0, 550 * scale);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();



        //Tor rechts
        crc2.beginPath();
        crc2.moveTo(1000 * scale, 315 * scale);
        crc2.lineTo(994 * scale, 315 * scale);
        crc2.moveTo(1000 * scale, 385 * scale);
        crc2.lineTo(994 * scale, 385 * scale);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Torraum rechts
        crc2.beginPath();
        crc2.moveTo(1000 * scale, 260 * scale);
        crc2.lineTo(945 * scale, 260 * scale);
        crc2.lineTo(945 * scale, 440 * scale);
        crc2.lineTo(1000 * scale, 440 * scale);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Strafraum rechts
        crc2.beginPath();
        crc2.moveTo(1000 * scale, 150 * scale);
        crc2.lineTo(835 * scale, 150 * scale);
        crc2.lineTo(835 * scale, 550 * scale);
        crc2.lineTo(1000 * scale, 550 * scale);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Mittelpunkt
        crc2.beginPath();
        crc2.arc(500 * scale, 350 * scale, 3, 0, 2 * Math.PI);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Elfer links
        crc2.beginPath();
        crc2.arc(110 * scale, 350 * scale, 2, 0, 2 * Math.PI);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();

        //Elfer rechts
        crc2.beginPath();
        crc2.arc(890 * scale, 350 * scale, 2, 0, 2 * Math.PI);
        crc2.strokeStyle = "rgba(255, 255, 255, 0.5)";
        crc2.lineWidth = 4;
        crc2.stroke();
        crc2.closePath();
    }
}