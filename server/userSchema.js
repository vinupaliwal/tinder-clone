import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email:String,
  name: String,
  profilePicture:String
});

export default mongoose.model('user', userSchema);