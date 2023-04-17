import mongoose from "mongoose"


const productCollections = 'productos'


const esquemaUnicoRequerido = {
    type : String,
    
    require: true
}


const productEsquema = new mongoose.Schema({
            title: esquemaUnicoRequerido,
            description: esquemaUnicoRequerido,
            price: esquemaUnicoRequerido,
            thumbnail:esquemaUnicoRequerido,
            code:esquemaUnicoRequerido,
            stock:esquemaUnicoRequerido,
            status:esquemaUnicoRequerido,
           
})



export const productsModel = mongoose.model( productCollections, productEsquema)