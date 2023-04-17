import mongoose from "mongoose"


const cartCollecion = 'cart' 


const cartEsquema = new mongoose.Schema({
    
    products : []
})

export const cartsModel = mongoose.model( cartCollecion, cartEsquema)