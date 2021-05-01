namespace memory {

    window.addEventListener("load", handleLoad);

    let cards: number[] = [];
    let tableTop: HTMLDivElement;
    let amount: number;
    let clicked: boolean = false;
    let firstValue: number;
    let secondValue: number;
    let targetOne: HTMLElement;
    let targetTwo: HTMLElement;
    let formData: FormData;
    let bColor: FormDataEntryValue | null;
    
    //let cardAmount: FormDataEntryValue | null;
    //let time: number = 0;
    //let body: HTMLElement = <HTMLElement>document.querySelector("body");


    function handleLoad(): void {

        let button: HTMLElement = <HTMLElement>document.querySelector("button");
        button.addEventListener("pointerdown", startGame);
    }

    function startGame(): void {
        let fieldset: HTMLFormElement = <HTMLFormElement>document.querySelector(".formular");
        let hOne: HTMLElement = <HTMLElement>document.querySelector("h1");
        fieldset.classList.add("hidden");
        hOne.classList.add("hidden");

        tableTop = <HTMLDivElement>document.createElement("div");

        document.body.appendChild(tableTop);
        tableTop.classList.add("test");

        formData = new FormData(document.forms[0]);
        let cardAmount: FormDataEntryValue | null = formData.get("stepper");
        if (cardAmount) {
            amount = Number(cardAmount);
        } else {
            amount = 5;
        }
        console.log(amount);
        bColor = formData.get("bColor");

        createCards();
    }

    function createCards(): void {
        for (let i: number = 1; i <= amount; i++) {
            cards.push(i);
            cards.push(i);
        }
        // console.log(cards);

        for (let a: number = cards.length; a > 0; a--) {
            let randomCard: number = Math.floor(Math.random() * cards.length);
            let pickedCard: number[] = cards.splice(randomCard, 1);
            //console.log(pickedCard[0]);

            tableTop = <HTMLDivElement>document.querySelector("div");
            let card: HTMLDivElement = <HTMLDivElement>document.createElement("div");
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

    function turnCard(_event: PointerEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let value: number = Number(target.id);
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

    function checkCards(): void {
        if (firstValue == secondValue) {
            targetOne.classList.add("rightCard");
            targetOne.classList.remove("visible");
            targetTwo.classList.add("rightCard");
            targetTwo.classList.remove("visible");
        } else {
            targetOne.innerText = "";
            targetTwo.innerText = "";
        }
    }
}