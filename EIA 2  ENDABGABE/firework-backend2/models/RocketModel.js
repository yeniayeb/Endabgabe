import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const RocketSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a first name'
    },
    color: {
        type: String,
        required: 'Enter a color'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=RocketModel.js.map