namespace Poem {

    window.addEventListener("load", handleLoad);

    let poem: HTMLElement | null;

    function handleLoad(): void {
        poem = document.getElementById("poem");
        document.querySelector("#btn1")?.addEventListener("mousedown", newPoem);
        createPoem();
    }

    let subjects: string[] = ["Alex", "Mara", "Alida", "Luci", "Karen", "Kenneth"];
    let verbs: string[] = ["braut", "liebt", "mag am liebsten", "hasst", "trinkt", "ext"];
    let objects: string[] = ["Bier", "Whiskey", "Vodka", "Sekt", "Gin", "Radler"];


    function createPoem(): void {
        for (let i: number = 5; i > 0; i--) {
            let sentence: string = getVerse(subjects, verbs, objects);
            // console.log(sentence);
            if (poem) {
                poem.innerText += sentence;
            }
        }
    }

    function getVerse(_subject: string[], _verb: string[], _object: string[]): string {

        let randomSubject: number = Math.floor(Math.random() * _subject.length);
        let randomVerb: number = Math.floor(Math.random() * _verb.length);
        let randomObject: number = Math.floor(Math.random() * _object.length);
        let verse: string = _subject.splice(randomSubject, 1)[0] + " " + _verb.splice(randomVerb, 1)[0] + " " + _object.splice(randomObject, 1)[0] + "\n";


        console.log(verse);


        return verse;
    }

    function newPoem(): void {
        location.reload();
    }
}