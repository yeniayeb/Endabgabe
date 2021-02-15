import { Routes } from './routes';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

  class App {
    // create express application which is a nodejs internal
    public app: express.Application;
    //create the routes like /api/rockets
    public routes: Routes = new Routes();
    //local mongodb url
    public localMongoUrl: string = 'mongodb://127.0.0.1:27017/firework';
    //remote mongodb url
    public remoteMongoUrl: string = "mongodb+srv://burak:burak@firework.fxgkf.mongodb.net/firework?retryWrites=true&w=majority";
    // variable holding the parameter from  npm start if the database url should be remote or local
    public isRemote: boolean;


    constructor() {
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

    private config(): void {

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
    private mongoSetup(): void {
      let url: string = this.localMongoUrl;
      if (this.isRemote) {
        url = this.remoteMongoUrl
      }
      console.log(url)
      // useUnifiedTopology because error occurs
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
    }

  }
// global access to app
export default new App().app;