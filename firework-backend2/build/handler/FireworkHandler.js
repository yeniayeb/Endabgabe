"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireworkHandler = void 0;
const RocketModel_1 = require("../models/RocketModel");
// handles the request from the router 
class FireworkHandler {
    // create rocket function
    create(req, res) {
        // create a new rocket from body i.e {name: "myrocket", color: 100, secondColor: 30, size: 0.95, speed: 5}
        let newrocket = new RocketModel_1.Rocket(req.body);
        console.log(req.body);
        //call mongoose save function to save the rocket in the database
        newrocket.save((err, rocket) => {
            if (err) {
                // if error send a 400 HTTP response
                res.status(400).send(err);
            }
            else {
                //return the posted document
                res.json(rocket);
            }
        });
    }
    // return all rockets, by passing empty object {} all documents will be returned
    getAll(req, res) {
        RocketModel_1.Rocket.find({}, (err, rockets) => {
            if (err) {
                // if error send a 400 HTTP response
                res.status(400).send(err);
            }
            else {
                //return all the documents
                res.json(rockets);
            }
        });
    }
    // delele rocket by id
    delete(req, res) {
        //read the rocketid from the request params
        RocketModel_1.Rocket.remove({ _id: req.params.rocketId }, (err) => {
            if (err) {
                // if error send a 400 HTTP response
                res.status(400).send(err);
            }
            else {
                res.json({ message: 'Successfully deleted rocket!' });
            }
        });
    }
}
exports.FireworkHandler = FireworkHandler;
//# sourceMappingURL=FireworkHandler.js.map