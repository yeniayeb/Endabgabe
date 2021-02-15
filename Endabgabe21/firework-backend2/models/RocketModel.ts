
import * as mongoose from 'mongoose';
// mongoose easy creating of collections and documents for mongo db
//rockets consists of name, color, secondcolor, speed, size
const RocketSchema = new mongoose.Schema({
  name: {
    type: String
  },
  color: {
    type: Number
  },
  secondColor: {
    type: Number
  },
  speed: {
    type: Number
  },
  size: {
    type: Number
  }
  
});
//create a mongoose => mongodb model with name rocket and the corresponding schema
export const Rocket =  mongoose.model('Rocket', RocketSchema);