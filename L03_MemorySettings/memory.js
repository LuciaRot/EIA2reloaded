"use strict";
var memory;
(function (memory) {
    window.addEventListener("load", handleLoad);
    let cards = [];
    let tableTop;
    let amount;
    let clicked = false;
    let firstValue;
    let secondValue;
    let targetOne;
    let targetTwo;
    let formData;
    let bColor;
    //let cardAmount: FormDataEntryValue | null;
    //let time: number = 0;
    //let body: HTMLElement = <HTMLElement>document.querySelector("body");
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
        formData = new FormData(document.forms[0]);
        let cardAmount = formData.get("stepper");
        if (cardAmount) {
            amount = Number(cardAmount);
        }
        else {
            amount = 5;
        }
        console.log(amount);
        bColor = formData.get("bColor");
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
            //console.log(pickedCard[0]);
            tableTop = document.querySelector("div");
            let card = document.createElement("div");
            card.classList.add("visible");
            card.id = pickedCard.toString();
            if (bColor) {
                card.style.backgroundColor = bColor?.toString();
            }
            //console.log(card.classList)
            tableTop.appendChild(card);
            //card.innerText = pickedCard.toString();
            card.addEventListener("pointerdown", turnCard);
        }
    }
    function turnCard(_event) {
        let target = _event.target;
        let value = Number(target.id);
        //console.log(value);
        target.innerText = value.toString();
        if (clicked == false) {
            firstValue = value;
            targetOne = target;
            clicked = true;
        }
        else if (clicked == true) {
            secondValue = value;
            targetTwo = target;
            clicked = false;
            setTimeout(checkCards, 2000);
        }
    }
    function checkCards() {
        if (firstValue == secondValue) {
            targetOne.classList.add("rightCard");
            targetOne.classList.remove("visible");
            targetTwo.classList.add("rightCard");
            targetTwo.classList.remove("visible");
        }
        else {
            targetOne.innerText = "";
            targetTwo.innerText = "";
        }
    }
})(memory || (memory = {}));
//# sourceMappingURL=memory.js.map