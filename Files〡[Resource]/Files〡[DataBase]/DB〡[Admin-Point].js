import { Schema, model } from 'mongoose';
const Balance = new Schema({
 _id: String,
 Point: { type: Number, required: false },
 Added: { type: Number, required: false },
 StartGame: { type: Number, required: false },
 JoinGame: { type: Number, required: false },
 AdminAssistant: { type: Number, required: false },
})
export default model('Admin Point', Balance)