"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
class App {
    constructor() {
        //create the routes like /api/rockets
        this.routes = new routes_1.Routes();
        //local mongodb url
        this.localMongoUrl = 'mongodb://127.0.0.1:27017/EIA2';
        //remote mongodb url
        this.remoteMongoUrl = "mongodb+srv://Ebru:14721661996@eia2.b7rlj.mongodb.net/EIA2?retryWrites=true&w=majority";
        // create express app
        this.app = express();
        //load the confog
        this.config();
        //initialize thea app with the routes
        this.routes.routes(this.app);
        //check if the passed parameter is remote
        //process.argv = "remote"
        this.isRemote = process.argv[2] == "remote";
        //setup the mongo configuration
        this.mongoSetup();
    }
    config() {
        // enable cors
        this.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "HEAD,PUT,POST,GET,DELETE,OPTIONS");
            next();
        });
        // easy parse json brom request.body
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    // set the url by reading if its remote
    mongoSetup() {
        let url = this.localMongoUrl;
        if (this.isRemote) {
            url = this.remoteMongoUrl;
        }
        console.log(url);
        // useUnifiedTopology because error occurs
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}
// global access to app
exports.default = new App().app;
//# sourceMappingURL=app.js.map