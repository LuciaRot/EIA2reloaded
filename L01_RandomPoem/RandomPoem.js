"use strict";
var Poem;
(function (Poem) {
    window.addEventListener("load", handleLoad);
    let poem;
    function handleLoad() {
        poem = document.getElementById("poem");
        document.querySelector("#btn1")?.addEventListener("mousedown", newPoem);
        createPoem();
    }
    let subjects = ["Harry", "Hermione", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let verbs = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objects = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    // console.log(subjects);
    // console.log(verbs);
    // console.log(objects);
    function createPoem() {
        for (let i = 5; i > 0; i--) {
            let sentence = getVerse(subjects, verbs, objects);
            // console.log(sentence);
            if (poem) {
                poem.innerText += sentence;
            }
            console.log(poem);
        }
    }
    function getVerse(_subject, _verb, _object) {
        let randomSubject = Math.floor(Math.random() * subjects.length);
        let randomVerb = Math.floor(Math.random() * verbs.length);
        let randomObject = Math.floor(Math.random() * objects.length);
        let verse = _subject.splice(randomSubject, 1)[0] + " " + _verb.splice(randomVerb, 1)[0] + " " + _object.splice(randomObject, 1)[0] + "\n";
        return verse;
    }
    function newPoem() {
        location.reload();
    }
})(Poem || (Poem = {}));
//# sourceMappingURL=RandomPoem.js.map