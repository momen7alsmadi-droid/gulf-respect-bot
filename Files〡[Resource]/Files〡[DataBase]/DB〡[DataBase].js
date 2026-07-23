import { Schema, model } from 'mongoose';
const Balance = new Schema({
 _id: String,
 Cash: { type: Number, required: true },
 Bank: { type: Number, required: true },
})
export default model('Balance', Balance)