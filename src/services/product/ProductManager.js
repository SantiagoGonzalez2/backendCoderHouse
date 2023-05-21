
import { productsModel } from '../../db/models/products.model.js'




class ProductManager {
    async getAllProducts() {
      try {
        let products = await productsModel.find({});
        return products;
      } catch (error) {
        console.log("No se pudo obtener la lista de productos " + error);
        throw error;
      }
    }
  
    async getProductById(id) {
      try {
        let product = await productsModel.findOne({ _id: id });
        return product;
      } catch (error) {
        console.log("No se pudo obtener el producto " + error);
        throw error;
      }
    }
  
   
    async addProduct(productData) {
      try {
        const existingProduct = await productsModel.findOne({title: productData.title, description: productData.description});
        if (existingProduct) {
          // Si el producto ya existe, incrementamos su cantidad y lo actualizamos
          existingProduct.stock ++
          await existingProduct.save();
          console.log("Se actualizó el producto existente con un stock de " + existingProduct.stock);
          return existingProduct;
        } else {
          // Si el producto no existe, lo agregamos
          const newProduct = new productsModel(productData);
          await newProduct.save();
          console.log("El producto se agregó correctamente.");
          return newProduct;
        }
      } catch (error) {
        console.log("No se pudo agregar el producto " + error);
        throw error;
      }
    }
    
    
    async updateProduct(id, productData) {
      try {
        let product = await productsModel.updateOne({ _id: id }, productData);
        console.log("El producto se actualizó correctamente.");
        return product;
      } catch (error) {
        console.log("No se pudo actualizar el producto " + error);
        throw error;
      }
    }
  
    async deleteProduct(id) {
     
       
    try {
    await  productsModel.deleteOne({ _id: id })
        console.log("El producto se eliminó correctamente.");
        
    }
    catch {
        console.log("No se pudo eliminar el producto " + error);
        throw error;
    };

    }
  }
  export default ProductManager