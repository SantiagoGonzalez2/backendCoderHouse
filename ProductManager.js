const fs = require('fs');


const products = []

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


    readFile () {
        const content = fs.readFileSync(this.path, 'utf-8')
        const parseContent = JSON.parse(content)

        return parseContent
    }

    

    addProducts() {

       


        let product = ({
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
            id: ProductManager.id


        })

        const verifyCode = products.find(element => element.code === product.code)

        if (verifyCode) {
            console.log("ERR")
        }


        else {
            products.push(product)
            ProductManager.id++

            // console.log(products)
        }
        if (!product.title || !product.description || !product.price ||

            !product.thumbnail || !product.code || !product.stock) {

            throw new Error("All fields are required");

        }
    }


    addToData() {
        fs.writeFileSync(this.path, JSON.stringify(products))
    }

    getProducts() {
        // console.log(this.readFile())
        return this.readFile()
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
        const productsFilter = dataFile.filter((product) => product.id !== id)


        if (!dataFile.find((obj) => obj.id === id)) throw new Error("product whit that id not found")

        else {
            fs.writeFileSync(this.path, JSON.stringify(productsFilter, null))


        }



    }




}

const twoPhone = new ProductManager("Iphonee", "14 PLUS", "plateado", "img", 1, 4)
const onePhone = new ProductManager("Samsung", "22 ULTRA", 1000, "hola", "img", 3)

//  twoPhone.addProducts()
//  onePhone.addProducts()

const newProductManager = new ProductManager()

// newProductManager.getProducts()
// newProductManager.getProductsById(1)
//  newProductManager.addToData()
 
// newProductManager.updateProduct(1, {title:199})
// newProductManager.deleteProduct(1)


module.exports = ProductManager
