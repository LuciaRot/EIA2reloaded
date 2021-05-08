"use strict";
var GenerativeKunst;
(function (GenerativeKunst) {
    window.addEventListener("load", handleLoad);
    let canvas;
    let crc2;
    let colors = ["#dee1dd", "#c4cdc2", "#99aead", "#6d9197", "#658b6f", "#2f575d", "#28363d"];
    let amount = Math.floor(Math.random() * 10) + 10;
    let scale = window.devicePixelRatio;
    function handleLoad() {
        document.querySelector(".btn")?.addEventListener("mousedown", reloadPage);
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        canvas.width = 600 * scale;
        canvas.height = 600 * scale;
        canvas.style.width = 600 + "px";
        canvas.style.height = 600 + "px";
        createImage();
    }
    function createImage() {
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
        pattern.globalAlpha = 50;
        pattern.moveTo(10, 20);
        pattern.lineTo(10, 60);
        pattern.bezierCurveTo(10, 65, 15, 70, 20, 70);
        pattern.lineTo(40, 70);
        pattern.bezierCurveTo(45, 70, 50, 65, 50, 65);
        pattern.lineTo(50, 55);
        pattern.bezierCurveTo(50, 55, 45, 50, 40, 50);
        pattern.lineTo(30, 50);
        pattern.lineTo(30, 20);
        pattern.bezierCurveTo(30, 15, 25, 10, 25, 10);
        pattern.lineTo(15, 10);
        pattern.bezierCurveTo(10, 15, 10, 20, 10, 20);
        pattern.moveTo(50, 20);
        pattern.lineTo(70, 20);
        pattern.bezierCurveTo(75, 20, 80, 25, 80, 30);
        pattern.lineTo(80, 70);
        pattern.bezierCurveTo(80, 75, 75, 80, 75, 80);
        pattern.lineTo(65, 80);
        pattern.bezierCurveTo(60, 75, 60, 70, 60, 70);
        pattern.lineTo(60, 40);
        pattern.lineTo(50, 40);
        pattern.bezierCurveTo(45, 40, 40, 35, 40, 35);
        pattern.lineTo(40, 25);
        pattern.bezierCurveTo(45, 20, 50, 20, 50, 20);
        pattern.stroke();
        pattern.closePath();
        pattern.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        pattern.fill();
        crc2.fillStyle = crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        console.log("Krieg ich jetzt Kekse? :D");
        for (let i = 0; i < amount; i++) {
            let x = Math.floor(Math.random() * 600);
            let y = Math.floor(Math.random() * 600);
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.lineTo(x, y);
            crc2.lineTo(crc2.canvas.width, crc2.canvas.height);
            crc2.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
            crc2.globalAlpha = Math.random();
            crc2.stroke();
            crc2.closePath();
        }
        for (let i = 0; i < amount; i++) {
            let x = Math.floor(Math.random() * 600);
            let y = Math.floor(Math.random() * 600);
            crc2.beginPath();
            crc2.moveTo(crc2.canvas.width, 0);
            crc2.lineTo(x, y);
            crc2.moveTo(x, y);
            crc2.lineTo(0, crc2.canvas.height);
            crc2.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
            crc2.globalAlpha = Math.random();
            crc2.stroke();
            crc2.closePath();
        }
        for (let i = 0; i < 15; i++) {
            let x = Math.floor(Math.random() * 600);
            let y = Math.floor(Math.random() * 600);
            crc2.beginPath();
            crc2.arc(x, y, 20, 0, 2 * Math.PI);
            crc2.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
            crc2.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            crc2.fill();
            crc2.globalAlpha = Math.random();
            crc2.stroke();
            crc2.closePath();
        }
    }
    function reloadPage() {
        location.reload();
    }
})(GenerativeKunst || (GenerativeKunst = {}));
//# sourceMappingURL=GenerativeKunst.js.map