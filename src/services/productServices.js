import ProductManager from "../../ProductManager.js";

const productManager = new ProductManager();

const getAllProducts = async () => {
  try {
    return await productManager.getAllProducts();
  } catch (error) {
    throw new Error("No se pudo obtener la lista de productos");
  }
};

const getProductById = async (id) => {
  try {
    return await productManager.getProductById(id);
  } catch (error) {
    throw new Error("No se pudo obtener el producto");
  }
};

const addProduct = async (productData) => {
  try {
    return await productManager.addProduct(productData);
  } catch (error) {
    throw new Error("No se pudo agregar el producto");
  }
};

const updateProduct = async (id, productData) => {
  try {
    return await productManager.updateProduct(id, productData);
  } catch (error) {
    throw new Error("No se pudo actualizar el producto");
  }
};

const deleteProduct = async (id) => {
  try {
    await productManager.deleteProduct(id);
    console.log("El producto se eliminó correctamente.");
  } catch (error) {
    throw new Error("No se pudo eliminar el producto");
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
