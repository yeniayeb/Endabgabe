import app from './app';
import * as http from 'http';
// create server
const PORT = process.env.PORT || 8081;
http.createServer(app).listen(PORT);