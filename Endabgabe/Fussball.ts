namespace football {

    window.addEventListener("load", handleLoad);
    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    let scale: number = window.devicePixelRatio;
    let x: number[] = [10, 150, 150, 150, 150, 425, 425, 425, 725, 725, 725];
    let y: number[] = [350, 125, 275, 425, 575, 175, 350, 525, 125, 350, 575];
    let a: number[] = [990, 850, 850, 850, 850, 575, 575, 575, 275, 275, 275];
    let b: number[] = [350, 575, 425, 275, 125, 525, 350, 175, 575, 350, 125];

    function handleLoad(): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        //field.style.backgroundColor = "red";
        canvas.width = 1000 * scale;
        canvas.height = 700 * scale;
        placePlayersTeamOne();
        placePlayersTeamTwo();
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


}