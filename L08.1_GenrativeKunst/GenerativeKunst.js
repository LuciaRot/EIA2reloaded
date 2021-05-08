"use strict";
var GenerativeKunst;
(function (GenerativeKunst) {
    window.addEventListener("load", handleLoad);
    let canvas;
    let crc2;
    let colors = ["#000000", "red", "blue", "purple", "orange"];
    let amount = Math.floor(Math.random() * 10);
    function handleLoad() {
        document.querySelector(".btn")?.addEventListener("mousedown", reloadPage);
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        canvas.style.width = 600 + "px";
        canvas.style.height = 600 + "px";
        createImage();
    }
    function createImage() {
        for (let i = 0; i < amount; i++) {
            let x = Math.floor(Math.random() * 100);
            let y = Math.floor(Math.random() * 100);
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
    function reloadPage() {
        location.reload();
    }
})(GenerativeKunst || (GenerativeKunst = {}));
//# sourceMappingURL=GenerativeKunst.js.map