"use strict";
var memory;
(function (memory) {
    window.addEventListener("load", handleLoad);
    let cards = [];
    let tableTop;
    let amount = 5;
    let clicked = false;
    let firstValue;
    let secondValue;
    let targetOne;
    let targetTwo;
    let time = 0;
    let body = document.querySelector("body");
    function handleLoad() {
        let button = document.querySelector("button");
        button.addEventListener("pointerdown", startGame);
    }
    function startGame() {
        let fieldset = document.querySelector(".formular");
        let hOne = document.querySelector("h1");
        fieldset.classList.add("hidden");
        hOne.classList.add("hidden");
        tableTop = document.createElement("div");
        document.body.appendChild(tableTop);
        tableTop.classList.add("test");
        createCards();
    }
    function createCards() {
        for (let i = 1; i <= amount; i++) {
            cards.push(i);
            cards.push(i);
        }
        // console.log(cards);
        for (let a = cards.length; a > 0; a--) {
            let randomCard = Math.floor(Math.random() * cards.length);
            let pickedCard = cards.splice(randomCard, 1);
            console.log(pickedCard[0]);
            tableTop = document.querySelector("div");
            let card = document.createElement("div");
            card.classList.add("visible");
            card.id = pickedCard.toString();
            //console.log(card.classList)
            tableTop.appendChild(card);
            card.innerText = pickedCard.toString();
            // card.addEventListener("pointerdown", turnCard);
        }
    }
    function turnCard(_event) {
        let target = _event.target;
        console.log(target);
        //let value: number = target.id; 
    }
})(memory || (memory = {}));
//# sourceMappingURL=memory.js.map