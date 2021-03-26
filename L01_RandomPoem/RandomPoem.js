"use strict";
var Poem;
(function (Poem) {
    let subjects = ["Harry", "Hermione", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let verbs = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objects = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    // console.log(subjects);
    // console.log(verbs);
    // console.log(objects);
    let poem = document.getElementById("poem");
    for (let i = 5; i > 0; i--) {
        let sentence = getVerse(subjects, verbs, objects);
        // console.log(sentence);
        if (poem) {
            poem.innerHTML += sentence;
        }
        console.log(poem);
    }
    function getVerse(_subject, _verb, _object) {
        let randomSubject = Math.floor(Math.random() * subjects.length);
        let randomVerb = Math.floor(Math.random() * verbs.length);
        let randomObject = Math.floor(Math.random() * objects.length);
        let verse = _subject.splice(randomSubject, 1)[0] + " " + _verb.splice(randomVerb, 1)[0] + " " + _object.splice(randomObject, 1)[0];
        return verse;
    }
})(Poem || (Poem = {}));
//# sourceMappingURL=RandomPoem.js.map