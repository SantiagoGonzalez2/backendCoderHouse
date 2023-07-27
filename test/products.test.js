import chai from "chai";
import supertest from "supertest";


const expect = chai.expect;
const requester = supertest("http://localhost:8080");

// NOTA : PARA PODER REALIZAR LOS TEST HAY QUE QUITAR LAS VALIZACIONES DE PASSPORT EN LAS RUTAS.

// Test 01

describe("Pruebas de la ruta getAllProducts", () => {
  it("debería devolver un array de productos con el estado 200", async () => {
    const response = await requester.get("/api/products");

    expect(response.status).to.equal(200);

    expect(response.body).to.be.an("array");
  });
});

// Test 02 |||| PARA ESTE TEST ES NECESARIO MODIFICAR EL CONTROLADOR DE ADD PRODUCTS Y ASIGNARLE UN OWNER POR DEFAULT
describe("Prueba de la ruta addProduct", () => {
  it("debería agregar un nuevo producto y devolverlo con el estado 200", async () => {
    const newProduct = {
      title: "Producto de prueba22",
      description: "Descripción del producto2",
      price: 100,
      thumbnail: "ruta.jpg",
      code: "ABC122223",
      stock: 101,
      status: "TRUE",
      owner: "admin",
    };

    const response = await requester
      .post("/api/products")
      .send(newProduct)
      .expect(200);

    const product = response.body;
    expect(product).to.be.an("object");
    expect(product).to.have.property("title").that.is.a("string");
    expect(product).to.have.property("description").that.is.a("string");
    expect(product).to.have.property("price").that.is.a("number");
    expect(product).to.have.property("thumbnail").that.is.a("string");
    expect(product).to.have.property("code").that.is.a("string");
    expect(product).to.have.property("stock").that.is.a("number");
    expect(product).to.have.property("status").that.is.a("string");
    expect(product).to.have.property("owner").that.is.a("string");
  });
});

