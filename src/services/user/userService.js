import { userModel } from "../../db/models/user.model.js";
import { cartsModel } from "../../db/models/cart.model.js";
import { isValidPassword, createHash,secretKey } from "../../utils.js";
import config from "../../config/config.js";
import jwt from "jsonwebtoken";
import CustomError from "../error/customError.js";



//registro
const registerUser = async (first_name, last_name, email, password, age) => {
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      throw new CustomError("El usuario ya existe.", 400);
    }

    // Validar los demás campos, por ejemplo:
    if (!first_name || !last_name || !email || !password || !age) {
      throw new CustomError("Todos los campos son obligatorios.", 400);
    }

    const newCart = new cartsModel();
    await newCart.save();

    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: newCart._id,
    });

    // Si la contraseña es 'peligro123', asignar rol admin
    if (password === config.passAdmin) {
      user.role = "admin";
      await user.save();
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



//login
const loginUser = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user || !isValidPassword(user, password)) {
      throw new CustomError("El usuario y la contraseña no coinciden.", 401);
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
        cart: user.cart,
        role: user.role,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    return { success: true, token, user };
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export default {
  registerUser,
  loginUser,
};
