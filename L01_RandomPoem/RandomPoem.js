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
    let subjects = ["Alex", "Mara", "Alida", "Luci", "Karen", "Kenneth"];
    let verbs = ["braut", "liebt", "mag am liebsten", "hasst", "trinkt", "ext"];
    let objects = ["Bier", "Whiskey", "Vodka", "Sekt", "Gin", "Radler"];
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
            if (i == 5)
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