import ProductService from "../../services/product/productServices.js";

const productService = ProductService;
//listar
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.send(products);
  } catch (error) {
    console.log("No se pudo obtener la lista de productos: " + error);
    res.status(500).send("No se pudo obtener la lista de productos");
  }
};
//listar por id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getProductById(productId);
    res.send(product);
  } catch (error) {
    console.log("No se pudo obtener el producto: " + error);
    res.status(500).send("No se pudo obtener el producto");
  }
};
//agregar
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = await productService.addProduct(productData);
    res.status(200).send(product);
  } catch (error) {
    console.log("No se pudo agregar el producto: " + error);
    res.status(500).send("No se pudo agregar el producto");
  }
};
//actualizar
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const productData = req.body;
    const product = await productService.updateProduct(productId, productData);
    res.status(202).send(product);
  } catch (error) {
    console.log("No se pudo actualizar el producto: " + error);
    res.status(500).send("No se pudo actualizar el producto");
  }
};
//borrar
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    await productService.deleteProduct(productId);
    console.log("El producto se eliminó correctamente.");
    res.status(200).send("Producto eliminado con éxito");
  } catch (error) {
    console.log("Error al eliminar el producto: " + error);
    res.status(500).send("Error al eliminar el producto");
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
