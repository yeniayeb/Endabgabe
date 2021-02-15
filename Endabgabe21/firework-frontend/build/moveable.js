"use strict";
var firework;
(function (firework) {
    class Moveable {
        constructor(v) {
            this.shrink = 0.97;
            this.gravity = 0;
            this.size = 2;
            this.resistance = 1;
            this.alpha = 1;
            this.fade = 0.0;
            this.pos = v;
        }
    }
    firework.Moveable = Moveable;
})(firework || (firework = {}));
//# sourceMappingURL=moveable.js.map