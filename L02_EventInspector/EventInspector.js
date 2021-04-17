"use strict";
var EventInspector;
(function (EventInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let body = document.querySelector("body");
        let divs = document.querySelectorAll("div");
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        for (let i = 0; i < divs.length; i++) {
            divs[i].addEventListener("click", logInfo);
            divs[i].addEventListener("keyup", logInfo);
        }
    }
    function setInfoBox(_event) {
        let span = document.querySelector("span");
        let x = _event.clientX;
        let y = _event.clientY;
        let target = _event.target;
        span.innerText = "x-coordinate:" + x + "y-coordinate:" + y + "target:" + target;
        span.style.left = x + 20 + "px";
        span.style.top = y + 20 + "px";
    }
    function logInfo(_event) {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event);
    }
})(EventInspector || (EventInspector = {}));
//# sourceMappingURL=EventInspector.js.map