"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const FireworkHandler_1 = require("./handler/FireworkHandler");
const express_1 = require("express");
class Routes {
    constructor() {
        this.fireworkHandler = new FireworkHandler_1.FireworkHandler();
    }
    routes(app) {
        // by calling <url>/ return get request successfull
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfull!'
            });
        });
        // create a router for endpoints 
        const api = express_1.Router();
        // create route <url>/api
        app.use('/api', api);
        // create Rockets url <url>/api/rockets
        api.route('/rockets')
            .get(this.fireworkHandler.getAll);
        // POST endpoint
        api.route('/rockets').post((req, res, next) => {
            console.log(`Request from: ${JSON.stringify(req.body)}`);
            next();
        }, this.fireworkHandler.create);
        // Contact detail
        api.route('/rocket/:rocketId')
            //by calling DELETE /api/rocket/rocketid, call function delete
            .delete(this.fireworkHandler.delete);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map