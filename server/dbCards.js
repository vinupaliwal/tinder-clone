import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
  userId:String,
  name: String,
  img: String,
});

export default mongoose.model('Cards', cardSchema);