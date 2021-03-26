namespace Poem {

    window.addEventListener("load", handleLoad);
    let poem: HTMLElement|null;

    function handleLoad(): void {
        poem = document.getElementById("poem");
        document.querySelector("#btn1")?.addEventListener("mousedown", newPoem);
        createPoem();
    }

    let subjects: string[] = ["Harry", "Hermione", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let verbs: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objects: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    // console.log(subjects);
    // console.log(verbs);
    // console.log(objects);

    
    function createPoem(): void {
    for (let i: number = 5; i > 0; i--) {
        let sentence: string = getVerse(subjects, verbs, objects);
        // console.log(sentence);
        if (poem) {
            poem.innerText += sentence;
        }
        if (i == 5)
        console.log(poem);
    }}

    function getVerse(_subject: string[], _verb: string[], _object: string[]): string {

        let randomSubject: number = Math.floor(Math.random() * subjects.length);
        let randomVerb: number = Math.floor(Math.random() * verbs.length);
        let randomObject: number = Math.floor(Math.random() * objects.length);

        let verse: string = _subject.splice(randomSubject, 1)[0] + " " + _verb.splice(randomVerb, 1)[0] + " " + _object.splice(randomObject, 1)[0] + "\n";

        return verse;

    }

    function newPoem(): void {
        location.reload();
    }
}