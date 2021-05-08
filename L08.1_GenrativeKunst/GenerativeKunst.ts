namespace GenerativeKunst {

    window.addEventListener("load", handleLoad);

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    let colors: string[] = ["#000000", "red", "blue", "purple", "orange"];
    let amount: number = Math.floor(Math.random() * 10);

    function handleLoad(): void {
        document.querySelector(".btn")?.addEventListener("mousedown", reloadPage);
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.style.width = 600 + "px";
        canvas.style.height = 600 + "px";
        createImage();

    }

    function createImage(): void {
        for (let i: number = 0; i < amount; i++) {
            let x: number = Math.floor(Math.random() * 100);
            let y: number = Math.floor(Math.random() * 100);
            
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.lineTo(x, y);
            crc2.moveTo(x, y);
            crc2.lineTo(crc2.canvas.width, crc2.canvas.height);
            crc2.closePath();
            crc2.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
            crc2.stroke();


            
        }
    }

    function reloadPage(): void {
        location.reload();
    }
}