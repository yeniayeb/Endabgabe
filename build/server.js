"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
// create server
const PORT = process.env.PORT || 8081;
http.createServer(app_1.default).listen(PORT);
//# sourceMappingURL=server.js.map