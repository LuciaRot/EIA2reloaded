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
    function createPoem() {
        for (let i = 5; i > 0; i--) {
            let sentence = getVerse(subjects, verbs, objects);
            // console.log(sentence);
            if (poem) {
                poem.innerText += sentence;
            }
        }
    }
    function getVerse(_subject, _verb, _object) {
        let randomSubject = Math.floor(Math.random() * _subject.length);
        let randomVerb = Math.floor(Math.random() * _verb.length);
        let randomObject = Math.floor(Math.random() * _object.length);
        let verse = _subject.splice(randomSubject, 1)[0] + " " + _verb.splice(randomVerb, 1)[0] + " " + _object.splice(randomObject, 1)[0] + "\n";
        console.log(verse);
        return verse;
    }
    function newPoem() {
        location.reload();
    }
})(Poem || (Poem = {}));
//# sourceMappingURL=RandomPoem.js.map