namespace football {

    window.addEventListener("load", handleLoad);

    //Canvas und rendering context Spielfeld.
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let scale: number = window.devicePixelRatio;

    //Canvas und rendering context Ball.
    export let canvasBall: HTMLCanvasElement;
    export let crc2Ball: CanvasRenderingContext2D;

    //Canvas und rendering context Spieler.
    export let canvasPlayers: HTMLCanvasElement;
    export let crc2Players: CanvasRenderingContext2D;

    //Elemente der HTML Datei
    let colorOne: HTMLInputElement;
    let colorTwo: HTMLInputElement;
    let minSpeedInput: HTMLInputElement;
    let maxSpeedInput: HTMLInputElement;
    let form: HTMLDivElement;
    export let minSpeed: number;
    export let maxSpeed: number;


    //Team Eins
    let x: number[] = [10, 150, 150, 150, 150, 425, 425, 425, 725, 750, 725];
    let y: number[] = [350, 125, 275, 425, 575, 175, 350, 525, 125, 350, 575];

    //Team Zwei
    let a: number[] = [990, 850, 850, 850, 850, 575, 575, 575, 275, 250, 275];
    let b: number[] = [350, 575, 425, 275, 125, 525, 350, 175, 575, 350, 125];

    //Spieler
    export let people: Player[] = [];
    export let colors: string[];

    //Position des Klicks
    export let clickX: number;
    export let clickY: number;

    export let ball: Ball;
    export let positionBall: Vector;

    export let playerPosition: Vector;

    export let i: number = 0;
    export let j: number = 6;



    function handleLoad(): void {

        canvasBall = <HTMLCanvasElement>document.getElementById("ball");
        crc2Ball = <CanvasRenderingContext2D>canvasBall.getContext("2d");
        canvasPlayers = <HTMLCanvasElement>document.getElementById("players");
        crc2Players = <CanvasRenderingContext2D>canvasPlayers.getContext("2d");
        canvas = <HTMLCanvasElement>document.getElementById("field");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");


        canvas.width = 1000 * scale;
        canvas.height = 700 * scale;
        canvasBall.width = 1000 * scale;
        canvasBall.height = 700 * scale;
        canvasPlayers.width = 1000 * scale;
        canvasPlayers.height = 700 * scale;
        canvasBall.addEventListener("click", handleClick);
        createField();
        minSpeed = 100;
        maxSpeed = 200;
        colors = ["black", "red"];
        placePlayersTeamOne();
        placePlayersTeamTwo();
        /* console.log(people); */
        positionBall = new Vector(500 * scale, 350 * scale);
        ball = new Ball(positionBall);
        ball.draw();
        colorOne = <HTMLInputElement>document.querySelector("input#colorOne");
        colorTwo = <HTMLInputElement>document.querySelector("input#colorTwo");
        minSpeedInput = <HTMLInputElement>document.querySelector("input#minspeed");
        maxSpeedInput = <HTMLInputElement>document.querySelector("input#maxspeed");

        form = <HTMLDivElement>document.querySelector("div#form");
        minSpeedInput.addEventListener("input", setMinSpeed);
        maxSpeedInput.addEventListener("input", setMaxSpeed);
        colorOne.addEventListener("input", setColor);
        colorTwo.addEventListener("input", setColor);

        form.addEventListener("change", handleChange);

        


    }

    function setColor(_event: Event): void {
        let color: string = (<HTMLInputElement>_event.target).value;
       /*  console.log(_event.target);
        console.log(colorOne); */
        if (_event.target == colorOne) {
            for (let i: number = 0; i < 11; i++) {
            colors[0] = color;
            let player: Player = people[i];
            player.changeColor(color);
            console.log(player.color);
            placePlayersTeamOne();
            }
        }
        else {
            colors[1] = color;
            for (let i: number = 11; i < 22; i++) {
                colors[1] = color;
                let player: Player = people[i];
                player.changeColor(color);
                placePlayersTeamTwo();
                }
                
        }
        
    }

    function setMinSpeed(_event: Event): void {
        let amount: string = (<HTMLInputElement>_event.target).value;
        console.log(amount);
        minSpeed = parseFloat(amount);

        for (let player of people) {
            player.changeSpeed(minSpeed, maxSpeed);
        }
    }

    function setMaxSpeed(_event: Event): void {
        let amount: string = (<HTMLInputElement>_event.target).value;
        console.log(amount);
        maxSpeed = parseFloat(amount);

        for (let player of people) {
            player.changeSpeed(minSpeed, maxSpeed);
        }
    }

    function handleChange(_event: Event): void {
        console.log(_event);
        }

    function handleClick(_event: MouseEvent): void {
        /* console.log("clicked"); */
        let rectangle: DOMRect = canvasBall.getBoundingClientRect();
        clickX = Math.floor(_event.clientX - rectangle.left);
        clickY = Math.floor(_event.clientY - rectangle.top);
        console.log(clickX, clickY);

        setInterval(moveBall, 20);

        /* console.log(people); */
        for (let player of people) {
            player.checkPosition();
            crc2Players.clearRect(0, 0, canvasPlayers.width, canvasPlayers.height);
            if (player.near == true) {
                player.move();
                
            }
            player.draw();
        }
        

    }



    function moveBall(): void {
        crc2Ball.clearRect(0, 0, canvasBall.width, canvasBall.height);
        /*  if (clickX == positionBall.x && clickY == positionBall.y) {
             clearInterval();
         } */
        ball.move(1 / 50);
        ball.draw();
    }

    function movePlayer(): void {
        let playerX: number = people[j].position.x - 7;
        let playerY: number = people[j].position.y - 7;
        let playerXTwo: number = people[j].position.x + 7;
        let playerYTwo: number = people[j].position.y + 7;
        let distance: Vector = new Vector(positionBall.x - people[j].position.x, positionBall.y - people[j].position.y);
        console.log(Math.sqrt(distance.x * distance.x + distance.y * distance.y));
        if (Math.sqrt(distance.x * distance.x + distance.y * distance.y) <= 300 * scale) {
            console.log("near");
            crc2Players.clearRect(playerX, playerY, playerXTwo, playerYTwo);
            people[j].move();
            people[j].draw();

        }
    }


    function placePlayersTeamOne(): void {

        for (let i: number = 0; i < 11; i++) {
            playerPosition = new Vector(x[i] * scale, y[i] * scale);
            let player: Player = new Player(playerPosition, colors[0], i);
            player.draw();
            people.splice(i, 1, player);

        }
        console.log(people);
    }

    function placePlayersTeamTwo(): void {

        for (let i: number = 11; i < 22; i++) {
            playerPosition = new Vector(a[i - 11] * scale, b[i - 11] * scale);
            let player: Player = new Player(playerPosition, colors[1], i);
            player.draw();
            people.splice(i, 1, player);

        }

        /* console.log(people); */
    }

    /* function showStats(): void {
        console.log(people[i]);
    } */

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