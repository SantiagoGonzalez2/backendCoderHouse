import chai from "chai";
import supertest from "supertest";
import CartManager from "../src/services/cart/CartManager.js";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

// NOTA : PARA PODER REALIZAR LOS TEST HAY QUE QUITAR LAS VALIZACIONES DE PASSPORT EN LAS RUTAS.

// Test 01
describe("Prueba de la ruta createCart", () => {
  it("debería crear un nuevo carrito y devolverlo con el estado 200", async () => {
    const cartManager = new CartManager();

    const response = await requester.post("/api/cart").expect(200);

    const createdCart = response.body;
    expect(createdCart).to.be.an("object");
    expect(createdCart).to.have.property("products");
  });
});

// Test 02
describe("Prueba de la ruta getCartById", () => {
  it("debería obtener correctamente un carrito existente por su ID", async () => {
    const response1 = await requester.post("/api/cart");

    const cartID = response1.body;
    const id = cartID._id;

    const response = await requester.get(`/api/cart/${id}`).expect(200);

    const retrievedCart = response.body;
    expect(retrievedCart).to.be.an("object");
  });

  // Test 03
  it("debería devolver un código de estado 404 si el carrito no existe", async () => {
    const nonExistentCartId = new mongoose.Types.ObjectId();

    const response = await requester
      .get(`/api/cart/${nonExistentCartId}`)
      .expect(404);

    expect(response.body).to.have.property(
      "message",
      "No se encontró el carrito"
    );
  });
});
