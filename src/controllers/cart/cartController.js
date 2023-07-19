import CartManager from "../../services/cart/CartManager.js";
import ProductManager from "../../services/product/ProductManager.js";
import cartService from "../../services/cart/cartService.js";
import TicketService from "../../services/cart/ticket/TicketManager.js";
import emailService from '../../services/email/emailService.js';
import config from "../../config/config.js";
import { nanoid } from "nanoid";
import productServices from "../../services/product/productServices.js";


//--controlador--//
const TicketManager = new TicketService()
const cartM = new CartManager()
const productManager = new ProductManager()


//crear carrito
const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.send(cart);
  } catch (error) {
    config.logger.error(error)
  }
};
// agregar a carrito existente
const addProductToCart = async (req, res) => {
    try {
      
      const pidProduct = req.params.pid;
    
      const cartId = req.user.cart
      

      const product = productServices.getProductById(pidProduct)
    

     
      const cart = await cartService.addProductToCart(cartId, pidProduct);
      res.setHeader('Location', `/api/cart/${cartId}`);
      res.status(302).end();
    

    } catch (error) {
      
      config.logger.error("No se pudo agregar el producto al carrito: " + error);

      res.status(500).send('No se pudo agregar el producto al carrito');
    }
  };



///eliminar del carrito
const removeProductFromCart = async (req, res) => {
    try {
      const cidCart = req.params.cid;
      const pidProduct = req.params.pid;
  
      await cartService.removeProductFromCart(cidCart, pidProduct);
  
      config.logger.info("El producto fue eliminado del carrito con éxito");
      res.status(201).send({ message: "Producto borrado del carrito" });
    } catch (error) {
      config.logger.error("No se pudo eliminar el producto del carrito: " + error);
      res.status(500).send({ message: "Ocurrió un error al eliminar el producto del carrito" });
    }
  };

// vaciar carrito
const removeAllProductsFromCart = async (req, res) => {
    try {
      const cidCart = req.params.cid;
  
      await cartService.removeAllProductsFromCart(cidCart);
  
      config.logger.info("El carrito fue vaciado con éxito");
      res.status(201).send({ message: "Carrito vaciado" });
    } catch (error) {
      config.logger.error("Ocurrió un error al vaciar el carrito: " + error);
      res.status(500).send({ message: "Ocurrió un error al vaciar el carrito" });
    }
  };

// actualizar cantidad
const updateProductQuantity = async (req, res) => {
    try {
      const cidCart = req.params.cid;
      const pidProduct = req.params.pid;
      const newQuantity = req.body.quantity;
  
      await cartService.updateProductQuantity(cidCart, pidProduct, newQuantity);
  
      config.logger.info("La cantidad del producto fue actualizada con éxito");
      res.status(200).send({ message: "Cantidad actualizada correctamente" });
    } catch (error) {
      config.logger.error("No se pudo actualizar la cantidad del producto: " + error);
      res.status(500).send({ message: "Ocurrió un error al actualizar la cantidad del producto" });
    }
  };
// obtener carrito
  const getCartById = async (req, res) => {
    try {
      const cidCart = req.params.cid;
  
      const cart = await cartService.getCartById(cidCart);
      if (cart) {
        res.render('cart', { cart });
      } else {
        res.status(404).send({ message: "No se encontró el carrito" });
      }
    } catch (error) {
      config.logger.error("Error al buscar el carrito: " + error);
      res.status(500).send({ message: "Ocurrió un error al buscar el carrito" });
    }
  };


// generar compra
const generateOrder = async (req, res) => {
  const cid = req.user.cart
  const code = nanoid();
  const purchaser = req.user.email;

  try {
    const cart = await cartM.getCartById(cid);
    const ticketProducts = [];
    const productsNotAdded = []; 

    for (const product of cart.products) {
      const { product: { _id: productId }, quantity } = product;

      const productData = await productManager.getProductById(productId);
      const stock = productData.stock;
      
      if (stock >= quantity) {
        ticketProducts.push(product);
        cartM.removeProductFromCart(cid, productId);
        const newStock = stock - quantity;
        await productManager.updateProduct(productId, { stock: newStock });
      } else {
        productsNotAdded.push(productId);
      }
    }
    if (ticketProducts.length === 0) {
      
      return res.status(400).send("No se pudo generar el ticket debido a la falta de stock");
    }
   

    const amount = await TicketManager.calculateTotal(ticketProducts);
    const createdTicket = await TicketManager.createTicket(code, amount, purchaser);
    config.logger.info('Ticket creado:', createdTicket);

    if (productsNotAdded.length > 0) {
      config.logger.info('Los siguientes productos no se agregaron a la orden por falta de stock:', productsNotAdded);
    }
    const mailOptions = {
      from: config.email,
      to: [config.email, req.user.email],
      subject: 'Detalles del ticket',
      html: `
        <h2>Detalles del ticket:</h2>
        <p><strong>Código:</strong> ${createdTicket.code}</p>
        <p><strong>Monto:</strong> ${createdTicket.amount}</p>
        <p><strong>Comprador:</strong> ${createdTicket.purchaser}</p>
        <h3>Productos:</h3>
        <ul>
          ${ticketProducts.map(product => `
            <li>
              <strong>Marca:</strong> ${product.product.title}<br>
              <strong>Modelo:</strong> ${product.product.description}<br>
              <strong>Precio por unidad:</strong> ${product.product.price}<br>
              <strong>Cantidad:</strong> ${product.quantity}
            </li>
          `).join('')}
        </ul>
      `,
      attachments: []
    };

    try {
      const result = await emailService(mailOptions);
      config.logger.info('Correo electrónico enviado:', result);
    } catch (error) {
      config.logger.error('Error al enviar el correo electrónico:', error);
    }
    

    res.status(200).render('ticket', createdTicket);
  } catch (error) {
    config.logger.error('Error al crear el ticket:', error);
    res.status(500).send("Error al crear el ticket");
  }
};







export default {
  createCart,
  addProductToCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  updateProductQuantity,
  getCartById,
  generateOrder
};
