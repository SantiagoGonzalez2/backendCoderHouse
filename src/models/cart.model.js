import mongoose from "mongoose";
import { productsModel } from "./products.model.js";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: productsModel,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

    const cartsModel = mongoose.model(cartCollection, cartSchema);

  export default cartsModel;