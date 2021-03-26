namespace Poem {
    let subjects: string[] = ["Harry", "Hermione", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let verbs: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objects: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    // console.log(subjects);
    // console.log(verbs);
    // console.log(objects);
    let poem: HTMLElement|null = document.getElementById("poem");

    for (let i: number = 5; i > 0; i--) {
        let sentence: string = getVerse(subjects, verbs, objects);
        // console.log(sentence);
        if (poem) {
            poem.innerHTML += sentence;
        }
        console.log(poem);
    }

    function getVerse(_subject: string[], _verb: string[], _object: string[]): string {

        let randomSubject: number = Math.floor(Math.random() * subjects.length);
        let randomVerb: number = Math.floor(Math.random() * verbs.length);
        let randomObject: number = Math.floor(Math.random() * objects.length);

        let verse: string = _subject.splice(randomSubject, 1)[0] + " " + _verb.splice(randomVerb, 1)[0] + " " + _object.splice(randomObject, 1)[0];

        return verse;

    }
}