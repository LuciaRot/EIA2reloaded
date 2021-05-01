namespace memory {

    window.addEventListener("load", handleLoad);

    let cards: number[] = [];
    let tableTop: HTMLDivElement;
    let amount: number = 5;
    let clicked: boolean = false;
    let firstValue: number;
    let secondValue: number;
    let targetOne: HTMLDivElement;
    let targetTwo: HTMLDivElement;
    let time: number = 0;
    let body: HTMLElement = <HTMLElement>document.querySelector("body");


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
            console.log(pickedCard[0]);

            tableTop = <HTMLDivElement>document.querySelector("div");
            let card: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            card.classList.add("visible");
            card.id = pickedCard.toString();

            //console.log(card.classList)
            tableTop.appendChild(card);
            card.innerText = pickedCard.toString();
           // card.addEventListener("pointerdown", turnCard);
        }
    }

    function turnCard(_event: PointerEvent) {
        let target: EventTarget = <EventTarget> _event.target;
        console.log(target);
        //let value: number = target.id; 
    }
}