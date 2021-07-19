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

    //Canvas und rendering context Schiedsrichter.
    export let canvasReferee: HTMLCanvasElement;
    export let crc2Referee: CanvasRenderingContext2D;

    //Elemente der HTML Datei
    let colorOne: HTMLInputElement;
    let colorTwo: HTMLInputElement;
    let minSpeedInput: HTMLInputElement;
    let maxSpeedInput: HTMLInputElement;
    let minPrecisionInput: HTMLInputElement;
    let maxPrecisionInput: HTMLInputElement;
    let form: HTMLDivElement;
    export let minSpeed: number = 1;
    export let maxSpeed: number = 5;
    let minPrecision: number = 1;
    let maxPrecision: number = 5;
    let scoreTeamOne: HTMLElement;
    let scoreTeamTwo: HTMLElement;
    let currentPlayer: HTMLElement;
    let playerNumber: HTMLElement;
    let playerSpeed: HTMLElement;
    let playerPrecision: HTMLElement;


    //Team Eins
    let x: number[] = [10, 150, 150, 150, 150, 425, 425, 425, 725, 750, 725];
    let y: number[] = [350, 125, 275, 425, 575, 175, 350, 525, 125, 350, 575];

    //Team Zwei
    let a: number[] = [990, 850, 850, 850, 850, 575, 575, 575, 275, 250, 275];
    let b: number[] = [350, 575, 425, 275, 125, 525, 350, 175, 575, 350, 125];

    //Spieler
    export let people: Player[] = [];
    export let colors: string[];
    export let referees: Referee[] = [];

    //Position des Klicks 
    export let clickX: number;
    export let clickY: number;



    export let ball: Ball;
    export let positionBall: Vector;

    export let playerPosition: Vector;

    export let i: number = 0;
    export let j: number = 6;

    //Spielstand
    let scores: number[] = [0, 0];

    let ballMovement: number;
    let playerMovement: number;

    let clicked: boolean;


    function handleLoad(): void {

        canvasBall = <HTMLCanvasElement>document.getElementById("ball");
        crc2Ball = <CanvasRenderingContext2D>canvasBall.getContext("2d");
        canvasPlayers = <HTMLCanvasElement>document.getElementById("players");
        crc2Players = <CanvasRenderingContext2D>canvasPlayers.getContext("2d");
        
        canvas = <HTMLCanvasElement>document.getElementById("field");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvasReferee = <HTMLCanvasElement>document.getElementById("referee");
        crc2Referee = <CanvasRenderingContext2D>canvas.getContext("2d");


        canvas.width = 1000 * scale;
        canvas.height = 700 * scale;
        canvasBall.width = 1000 * scale;
        canvasBall.height = 700 * scale;
        canvasPlayers.width = 1000 * scale;
        canvasPlayers.height = 700 * scale;
        canvasReferee.width = 1000 * scale;
        canvasReferee.height = 800 * scale;
        canvasBall.addEventListener("click", handleClick);
        createField();

        colors = ["black", "red"];
        placePlayersTeamOne();
        placePlayersTeamTwo();
        /* console.log(people); */
        newBall();
        placeSideReferee();
        setInterval(moveReferees, 20);
        colorOne = <HTMLInputElement>document.querySelector("input#colorOne");
        colorTwo = <HTMLInputElement>document.querySelector("input#colorTwo");
        minSpeedInput = <HTMLInputElement>document.querySelector("input#minspeed");
        maxSpeedInput = <HTMLInputElement>document.querySelector("input#maxspeed");
        minPrecisionInput = <HTMLInputElement>document.querySelector("input#minprecision");
        maxPrecisionInput = <HTMLInputElement>document.querySelector("input#maxprecision");

        form = <HTMLDivElement>document.querySelector("div#form");
        scoreTeamOne = <HTMLElement>document.querySelector("p#scoreOne");
        scoreTeamTwo = <HTMLElement>document.querySelector("p#scoreTwo");
        currentPlayer = <HTMLElement>document.querySelector("p#currentPlayer");
        playerNumber = <HTMLElement>document.querySelector("p#playerNumber");
        playerSpeed = <HTMLElement>document.querySelector("p#playerSpeed");
        playerPrecision = <HTMLElement>document.querySelector("p#playerPrecision");
        clicked = false;
        minSpeedInput.addEventListener("input", setMinSpeed);
        maxSpeedInput.addEventListener("input", setMaxSpeed);
        minPrecisionInput.addEventListener("input", setMinPrecision);
        maxPrecisionInput.addEventListener("input", setMaxPrecision);
        colorOne.addEventListener("input", setColor);
        colorTwo.addEventListener("input", setColor);

        form.addEventListener("change", handleChange);



    }

    function placeSideReferee(): void {
        
            let position: Vector = new Vector(10 * scale, 1 * scale);
            let refereeOne: Referee = new Referee(position);
            refereeOne.draw();
            referees.splice(0, 0, refereeOne);

            let positionTwo: Vector = new Vector(10 * scale, 845 / scale);
            let refereeTwo: Referee = new Referee(positionTwo);
            refereeTwo.draw();
            referees.splice(1, 0, refereeTwo);
            console.log(referees);
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

    function setMinPrecision(_event: Event): void {
        let amount: string = (<HTMLInputElement>_event.target).value;
        console.log(amount);
        minPrecision = parseFloat(amount);

        for (let player of people) {
            player.changePrecision(minPrecision, maxPrecision);
        }
    }

    function setMaxPrecision(_event: Event): void {
        let amount: string = (<HTMLInputElement>_event.target).value;
        console.log(amount);
        maxPrecision = parseFloat(amount);

        for (let player of people) {
            player.changePrecision(minPrecision, maxPrecision);
        }
        console.log(people);
    }

    function handleChange(_event: Event): void {
        console.log(_event);
    }

    function handleClick(_event: MouseEvent): void {
        /* console.log("clicked"); */
            let rectangleB: DOMRect = canvasBall.getBoundingClientRect();
            clickX = Math.floor(_event.clientX - rectangleB.left);
            clickY = Math.floor(_event.clientY - rectangleB.top);
            console.log(clickX, clickY);

            if (clicked == true) {
                clicked = false;
            }

            for (let player of people) {
                player.checkClick(clickX, clickY);
                if (player.clicked == true) {
                    playerNumber.innerHTML = "Player " + player.playerNumber;
                    playerSpeed.innerHTML = "Speed " + player.speed;
                    playerPrecision.innerHTML = "Precision " + player.precision;
                    player.clicked = false;
                    clicked = true;

                }
            }

            if (clicked == false) {
                playerNumber.innerHTML = "";
                playerSpeed.innerHTML = "";
                playerPrecision.innerHTML = "";
                ballMovement = setInterval(moveBall, 20);
                playerMovement = setInterval(movePlayer, 20);
            }   
    }



    function setScore(): void {
        if (ball.goal == false) {
            let scoreOne: number = scores[0];
            let scoreTwo: number = scores[1];
            if (994 * scale <= positionBall.x && positionBall.x <= 1000 * scale && 315 * scale <= positionBall.y && positionBall.y <= 385 * scale) {
                scoreOne += 1;
                scores.splice(0, 1, scoreOne);
                scoreTeamOne.innerHTML = scoreOne.toString() + ":";
                ball.goal = true;
                clearInterval(ballMovement);

                newBall();
            }
            else if (0 <= positionBall.x && positionBall.x <= 6 * scale && 315 * scale << positionBall.y && positionBall.y <= 385 * scale) {
                scoreTwo += 1;
                scores.splice(1, 1, scoreTwo);
                scoreTeamTwo.innerHTML = scoreTwo.toString();
                ball.goal = true;
                clearInterval(ballMovement);

                newBall();

            }
        }
    }

    function newBall(): void {
        crc2Ball.clearRect(0, 0, canvasBall.width, canvasBall.height);
        positionBall = new Vector(500 * scale, 350 * scale);
        ball = new Ball(positionBall);
        ball.draw();
    }



    function moveBall(): void {
        let minX: number = clickX - 1;
        let maxX: number = clickX + 1;
        let minY: number = clickY - 1;
        let maxY: number = clickY + 1;
        crc2Ball.clearRect(0, 0, canvasBall.width, canvasBall.height);

        ball.move(1 / 50);
        ball.draw();
        /* console.log(positionBall, clickX, clickY); */
        if (minX <= positionBall.x && positionBall.x <= maxX && minY <= positionBall.y && positionBall.y <= maxY) {
            clearInterval(ballMovement);
            setScore();

        }


    }

    function movePlayer(): void {
        crc2Players.clearRect(0, 0, canvasPlayers.width, canvasPlayers.height);

        for (let player of people) {
            /* console.log(player.speed); */
            player.checkPosition();
            if (player.near == true) {
                player.move();
            }
            player.draw();

            player.checkCollision();
            if (player.atBall == true) {
                clearInterval(playerMovement);
                clearInterval(ballMovement);
                currentPlayer.innerHTML = "Player" + player.playerNumber;

                playerMovement = setInterval(movePlayerBack, 20);
            }

        }

    }

    function movePlayerBack(): void {
        crc2Players.clearRect(0, 0, canvasPlayers.width, canvasPlayers.height);
        for (let player of people) {
            /* console.log(player.speed); */
            if (player.atBall == false) {
                console.log("false");
                player.moveToStart();
                player.draw();

            }
            else if (player.atBall == true) {
                player.draw();

            }
            let currentPosition: Vector = new Vector(Math.floor(player.position.x), Math.floor(player.position.y));


            if (player.startPosition.x - 10 <= currentPosition.x && currentPosition.x <= player.startPosition.x + 10 && player.startPosition.y - 10 <= currentPosition.y && currentPosition.y <= player.startPosition.y + 10) {
                player.atStartposition = true;
            }

            let k: number = 0;
            for (let player of people) {
                if (player.atStartposition == true) {
                    k += 1;
                }
            }
            if (k == 21) {
                clearInterval(playerMovement);
                player.atBall = false;
                player.near = false;

            }
        }

    }


    function placePlayersTeamOne(): void {

        for (let i: number = 0; i < 11; i++) {
            playerPosition = new Vector(x[i] * scale, y[i] * scale);
            let player: Player = new Player(playerPosition, colors[0], i);
            if (player.speed == undefined) {
                player.speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed) / 200;
            }
            if (player.precision == undefined) {
                player.precision = Math.floor(Math.random() * (maxPrecision - minPrecision + 1) + minPrecision);
            }
            player.draw();
            people.splice(i, 1, player);

        }
        console.log(people);
    }

    function placePlayersTeamTwo(): void {

        for (let i: number = 11; i < 22; i++) {
            playerPosition = new Vector(a[i - 11] * scale, b[i - 11] * scale);
            let player: Player = new Player(playerPosition, colors[1], i);
            if (player.speed == undefined) {
                player.speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed) / 200;
            }
            if (player.precision == undefined) {
                player.precision = Math.floor(Math.random() * (maxPrecision - minPrecision + 1) + minPrecision);
            }
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