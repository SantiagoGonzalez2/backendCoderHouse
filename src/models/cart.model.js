import mongoose from "mongoose"


const cartCollecion = 'cart' 


const cartEsquema = new mongoose.Schema({
    
    products : [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            }
        }
    ]
})

export const cartsModel = mongoose.model( cartCollecion, cartEsquema)