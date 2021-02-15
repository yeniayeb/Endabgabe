"use strict";
var firework;
(function (firework) {
    async function getRockets() {
        return await fetch("rockets.json");
    }
    firework.getRockets = getRockets;
    async function postRockets(rockets) {
    }
    firework.postRockets = postRockets;
})(firework || (firework = {}));
//# sourceMappingURL=api.js.map