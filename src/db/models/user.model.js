import mongoose from "mongoose";
import { cartsModel } from "./cart.model.js";


const userCollection = 'users'



const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    // required: true
  },
  last_name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
   
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  password:{
    type: String,
    
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'premium'],
    default: 'user'
  },
 
  cart: {
    type: mongoose.Types.ObjectId,
    ref: cartsModel
  }
 
});

export const userModel = mongoose.model(userCollection, userSchema)
