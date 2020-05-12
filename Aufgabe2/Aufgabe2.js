"use strict";
var LO2_Sequenzmemory;
(function (LO2_Sequenzmemory) {
    console.log("start");
    let chosenWord;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let div = document.querySelector("div.card");
        div.addEventListener("click", card);
        document.addEventListener("keydown", activateJoker);
    }
    function card(_event) {
        console.log("hello");
    }
    function activateJoker(_event) {
        console.log("help");
    }
})(LO2_Sequenzmemory || (LO2_Sequenzmemory = {}));
//# sourceMappingURL=Aufgabe2.js.map