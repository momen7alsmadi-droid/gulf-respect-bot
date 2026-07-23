import { Schema, model } from 'mongoose';
const Finance = new Schema({
 _id: String,
 Money: { type: Number, required: true },
})
export default model('Ministry of Finance', Finance)