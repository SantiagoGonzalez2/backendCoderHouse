import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'


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

productEsquema.plugin(mongoosePaginate);

 const productsModel = mongoose.model( productCollections, productEsquema)

 export default productsModel;