"use strict";
var firework;
(function (firework) {
    let Speed;
    (function (Speed) {
        Speed[Speed["SLOW"] = 1] = "SLOW";
        Speed[Speed["MIDDLE"] = 2] = "MIDDLE";
        Speed[Speed["FAST"] = 3] = "FAST";
    })(Speed = firework.Speed || (firework.Speed = {}));
})(firework || (firework = {}));
//# sourceMappingURL=speedEnum.js.map