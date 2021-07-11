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

    //Team Eins
    let x: number[] = [10, 150, 150, 150, 150, 425, 425, 425, 725, 750, 725];
    let y: number[] = [350, 125, 275, 425, 575, 175, 350, 525, 125, 350, 575];

    //Team Zwei
    let a: number[] = [990, 850, 850, 850, 850, 575, 575, 575, 275, 250, 275];
    let b: number[] = [350, 575, 425, 275, 125, 525, 350, 175, 575, 350, 125];

    //Spieler
    let people: number[][] = [];
    let colors: string[] = ["black", "red"];

    //Position des Klicks
    export let clickX: number;
    export let clickY: number;

    export let ball: Ball;
    export let positionBall: Vector;

    let playerPosition: Vector;



    function handleLoad(): void {

        canvasBall = <HTMLCanvasElement>document.getElementById("ball");
        crc2Ball = <CanvasRenderingContext2D>canvasBall.getContext("2d");
        canvasPlayers = <HTMLCanvasElement>document.getElementById("players");
        crc2Players = <CanvasRenderingContext2D>canvasBall.getContext("2d");

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
        placePlayersTeamOne(0);
        placePlayersTeamTwo(0);
        positionBall = new Vector(500 * scale, 350 * scale);
        ball = new Ball(positionBall);
        ball.draw();

    }

    function handleClick(_event: MouseEvent): void {
        console.log("clicked");
        let rectangle: DOMRect = canvasBall.getBoundingClientRect();
        clickX = _event.clientX - rectangle.left;
        clickY = _event.clientY - rectangle.top;
        setInterval(moveBall, 20);

    }

    function moveBall(): void {
        crc2Ball.clearRect(0, 0, canvasBall.width, canvasBall.height);
        ball.move(1 / 50);
        ball.draw();
    }

    function placePlayersTeamOne(_s: number): void {
        let players: number[] = [];
        for (let i: number = 0; i < 11; i++) {
            playerPosition = new Vector(x[_s] * scale, y[_s] * scale);
            let player: Player = new Player(playerPosition);
            player.draw(colors[0]);
            players.splice(_s, 0, _s);
            _s += 1;
        }
        people.splice(0, 0, players);
        console.log(people[0]);
    }

    function placePlayersTeamTwo(_t: number): void {
        let players: number[] = [];

        for (let i: number = 0; i < 11; i++) {
            playerPosition = new Vector(a[_t] * scale, b[_t] * scale);
            let player: Player = new Player(playerPosition);
            player.draw(colors[1]);
            players.splice(_t, 0, _t);
            _t += 1;
        }
        people.splice(1, 0, players);
        console.log(people[1]);
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