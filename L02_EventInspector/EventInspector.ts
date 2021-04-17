namespace EventInspector {

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        let body: HTMLElement = <HTMLElement> document.querySelector("body");
        let divs: NodeListOf<HTMLDivElement> = document.querySelectorAll("div");

        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);

        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);

        for (let i: number = 0; i < divs.length; i++) {
            divs[i].addEventListener("click", logInfo);
            divs[i].addEventListener("keyup", logInfo);
        }
    }

    function setInfoBox(_event: MouseEvent): void {
        let span: HTMLElement = <HTMLElement> document.querySelector("span");
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let target: EventTarget = <EventTarget> _event.target;
        span.innerText = "x-coordinate:" + x + "y-coordinate:" + y + "target:" + target;
        span.style.left = x + 20 + "px";
        span.style.top = y + 20 + "px";
    }

    function logInfo (_event: Event): void {
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event);
    }



















}