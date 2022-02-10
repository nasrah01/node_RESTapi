import mongoose from 'mongoose'

const User = new mongoose.Schema({
  name: {type:String, required: true},
  email: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  userId: {type:String, required: true},
},
)

export default mongoose.model('User-data', User);
