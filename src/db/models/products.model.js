import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'
// import { userModel } from "./user.model.js";



const productCollections = 'productos'


const productEsquema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: userModel,
    //     default: "admin",
    //   },
     owner: {
      type: String,
        default: "admin",
      },
  });

productEsquema.plugin(mongoosePaginate);

export  const productsModel = mongoose.model( productCollections, productEsquema)













