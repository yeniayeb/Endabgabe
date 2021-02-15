import { FireworkHandler } from './handler/FireworkHandler';

import { Router, Request, Response, NextFunction, Application } from "express";
export class Routes {

  public fireworkHandler: FireworkHandler = new FireworkHandler();

  public routes(app: Application): void {
    // by calling <url>/ return get request successfull
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request successfull!'
        })
      })
    // create a router for endpoints 
    const api = Router();
    // create route <url>/api
    app.use('/api', api);

    // create Rockets url <url>/api/rockets
    api.route('/rockets')
      .get(this.fireworkHandler.getAll)

    // POST endpoint
    api.route('/rockets').post(this.fireworkHandler.create);

    // rocket detail
    api.route('/rocket/:rocketId')
      //by calling DELETE /api/rocket/rocketid, call function delete
      .delete(this.fireworkHandler.delete)

  }
}