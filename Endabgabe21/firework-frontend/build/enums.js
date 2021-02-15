"use strict";
var firework;
(function (firework) {
    let Speed;
    (function (Speed) {
        Speed[Speed["SLOW"] = 1] = "SLOW";
        Speed[Speed["MIDDLE"] = 2] = "MIDDLE";
        Speed[Speed["FAST"] = 3] = "FAST";
    })(Speed = firework.Speed || (firework.Speed = {}));
    let Size;
    (function (Size) {
        Size[Size["SMALL"] = 4] = "SMALL";
        Size[Size["MEDIUM"] = 8] = "MEDIUM";
        Size[Size["LARGE"] = 12] = "LARGE";
    })(Size = firework.Size || (firework.Size = {}));
    let Color;
    (function (Color) {
        Color[Color["YELLOW"] = 60] = "YELLOW";
        Color[Color["GREEN"] = 120] = "GREEN";
        Color[Color["BLUE"] = 240] = "BLUE";
        Color[Color["RED"] = 0] = "RED";
    })(Color = firework.Color || (firework.Color = {}));
})(firework || (firework = {}));
//# sourceMappingURL=enums.js.map