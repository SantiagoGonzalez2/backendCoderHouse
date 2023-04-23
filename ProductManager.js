import fs from 'fs'
import { productsModel } from './src/models/products.model.js'





class ProductManager {

    static id = 1

    constructor(title, description, price, thumbnail, code, stock) {
        this.path = ("data.json")
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        ProductManager.id

    }


    // readFile () {
    //     const content = fs.readFileSync(this.path, 'utf-8')
    //     const parseContent = JSON.parse(content)

    //     return parseContent
    // }

   async readFile ()   { 
        

        try{
            // const content  = await productsModel.find().lean()
            // console.log(content);
            return await productsModel.find().lean()
        }
        catch(err){console.log("no se pueden obtener los productos del servidor");}
       

    }

    

//   async  addProducts(title, description, price,thumbnail, code, stock, status ) {

//        let products = await productsModel.find()


//         // let product = ({
//         //     title: this.title,
//         //     description: this.description,
//         //     price: this.price,
//         //     thumbnail: this.thumbnail,
//         //     code: this.code,
//         //     stock: this.stock,
//         //     // id: ProductManager.id


//         // })

//         const verifyCode = products.find(element => element.code === product.code)

//         if (verifyCode) {
//             console.log("ERR that code is in use")
//         }


//         else {
//         //     products.push(product)
//         //    await  products.save()

//             // ProductManager.id++
//           await   productsModel.create({
//                 title: this.title,
//                 description: this.description,
//                 price: this.price,
//                 thumbnail: this.thumbnail,
//                 code: this.code,
//                 stock: this.stock,
//             })
            

//             console.log('agregado')
//         }
//         // if (!product.title || !product.description || !product.price ||

//         //     !product.thumbnail || !product.code || !product.stock) {

//         //     throw new Error("All fields are required");

//         // }
//     }


  async  addToData(params) {
       try {
        productsModel.create(params)
        console.log('Producto agregado');
       }catch (error){
        console.log('error al crear nuevo producto');
       }
    }

    async getProducts() {
        // console.log(this.readFile())
        // return this.readFile()
        try{
            // const content  = await productsModel.find().lean()
            // console.log(content);
            let products = await productsModel.find().lean()
            
            return products
           
        }
        catch(err){console.log("no se pueden obtener los productos del servidor");}
       

    
    }

   

    getProductsById(id) {

        const dataFile = this.readFile()

        if (!dataFile.find((obj) => obj.id === id)) throw new Error("product whit that id not found")
    
        else{
         console.log(dataFile.find((obj) => obj.id === id))
        }
    }

     updateProduct(id, obj) {
        
        const dataFile = this.readFile()

            const update = dataFile.map((product) => product.id === id ? { ...product, ...obj } : product)

            if (!dataFile.find((obj) => obj.id === id)) throw new Error("product whit that id not found")

            else{
              fs.writeFileSync(this.path, JSON.stringify(update, null))

            }
    }

    deleteProduct(id) {
        const dataFile = this.readFile() 

        let products  =dataFile
      

        const userPosition = products.filter((product) => product.id !== id)

        


        if (!dataFile.find((obj) => obj.id === id)) throw new Error("product whit that id not found")

        else {
            fs.writeFileSync('data.json', JSON.stringify(userPosition, null))


        }



    }




}

// const twoPhone = new ProductManager("Iphonee", "14 PLUS", "plateado", "img", 1, 4)
// const onePhone = new ProductManager("Samsung", "22 ULTRA", 1000, "hola", "img", 3)

//  twoPhone.addProducts()
//  onePhone.addProducts()

// const newProductManager = new ProductManager()

// newProductManager.getProducts()
// newProductManager.getProductsById(1)
//  newProductManager.addToData()
 
// newProductManager.updateProduct(7, {title:"todo bien"})
// newProductManager.deleteProduct(0)


export default ProductManager
