import chai from "chai";
import supertest from "supertest";
import { userModel } from "../src/db/models/user.model.js";



const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing de USERS", () => {
  describe("Testing logins:", () => {
    before(function () {
      this.cookie;
      this.mockUser = {
        first_name: "Usuario de11 pr22ueba 2",
        last_name: "Apellido de1122 prueba 2",
        age: 25,
        email: `${Math.random()}@gmail.com`,
        password: "123456",
      };
    });

    // Test 01
    it("Test Registro Usuario:", async function () {
      // Then:
      const { statusCode } = await requester
        .post("/api/sessions/register")
        .send(this.mockUser);

      // Assert that:
      expect(statusCode).to.equal(201);
    });

    // Test 02
    it("Test Login Usuario: ", async function () {
      // Given:
      const mockLogin = {
        email: this.mockUser.email,
        password: this.mockUser.password,
      };

      // Then:
      const result = await requester
        .post("/api/sessions/login")
        .send(mockLogin);
      const cookieResult = result.headers["set-cookie"][0];

      // Assert that:
      expect(result.statusCode).to.equal(200);

      const cookieData = cookieResult.split("=");
      this.cookie = {
        name: cookieData[0],
        value: cookieData[1].split(";")[0],
      };

      expect(this.cookie.name).to.equal("jwt");
      expect(this.cookie.value).to.be.ok;
    });
    // TEST 03
 
    it("should update the user role to 'premium'", async () => {
   
      const userMock = {
        first_name:"santi",
        last_name: "Do",
        email: `${Math.random()}@gmail.com`,
        age: 30,
        password: "password123",
        role: "user",
      
      };
     
      

     const createdUser = await userModel.create(userMock);

     // Obtén el ID del usuario creado
     const id = createdUser._id;

    
  
      // Realiza la solicitud PUT a la ruta updateUserRole
      const response = await requester.put(`/api/sessions/premium/${id}`).expect(201);
  
      
  
  

    });
  });
  
 
});
