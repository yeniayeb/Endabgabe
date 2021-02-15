import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Rocket } from '../models/RocketModel';

// handles the request from the router 
  export class FireworkHandler {
    // create rocket function
    public create(req: Request, res: Response) {
      // create a new rocket from body i.e {name: "myrocket", color: 100, secondColor: 30, size: 0.95, speed: 5}
      let newrocket = new Rocket(req.body);
      console.log(req.body)
      //call mongoose save function to save the rocket in the database
      newrocket.save((err, rocket) => {
        if (err) {
          // if error send a 400 HTTP response
          res.status(400).send(err);
        } else {
          //return the posted document
          res.json(rocket);
        }
      });
    }
    // return all rockets, by passing empty object {} all documents will be returned
    public getAll(req: Request, res: Response) {
      Rocket.find({},(err, rockets) => {
        if (err) {
          // if error send a 400 HTTP response
          res.status(400).send(err);
        } else {
          //return all the documents
          res.json(rockets);
        }
      });
    }
    // delele rocket by id
    public delete(req: Request, res: Response) {
      //read the rocketid from the request params
      Rocket.remove({ _id: req.params.rocketId }, (err) => {
        if (err) {
          // if error send a 400 HTTP response
          res.status(400).send(err);
        } else {
          
          res.json({ message: 'Successfully deleted rocket!' });
        }
      });
    }
    
  }