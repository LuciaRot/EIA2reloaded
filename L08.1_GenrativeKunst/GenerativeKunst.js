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
        for (let i = 0; i < amount; i++) {
            let x = Math.floor(Math.random() * 600);
            let y = Math.floor(Math.random() * 600);
            crc2.beginPath();
            crc2.moveTo(0, 0);
            crc2.lineTo(x, y);
            crc2.moveTo(x, y);
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