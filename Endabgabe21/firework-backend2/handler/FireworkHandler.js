import { RocketSchema } from './../models/RocketModel';
import * as mongoose from 'mongoose';
const Rocket = mongoose.model('Rockets', RocketSchema);
export class FireworkHandler {
    create(req, res) {
        let newrocket = new Rocket(req.body);
        newrocket.save((err, rocket) => {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.json(rocket);
            }
        });
    }
    getAll(req, res) {
        Rocket.find({}).select('-__v').exec((err, rockets) => {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.json(rockets);
            }
        });
    }
    getByID(req, res) {
        Rocket.findById(req.params.rocketId).select('-__v').exec((err, rocket) => {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.json(rocket);
            }
        });
    }
    update(req, res) {
        Rocket.findOneAndUpdate({ _id: req.params.rocketId }, req.body, { new: true }, (err, rocket) => {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.json(rocket);
            }
        });
    }
    delete(req, res) {
        Rocket.remove({ _id: req.params.rocketId }, (err) => {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.json({ message: 'Successfully deleted contact!' });
            }
        });
    }
}
//# sourceMappingURL=FireworkHandler.js.map