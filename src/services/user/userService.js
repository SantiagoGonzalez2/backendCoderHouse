import { userModel } from "../../db/models/user.model.js";
import { cartsModel } from "../../db/models/cart.model.js";
import { isValidPassword, createHash,secretKey } from "../../utils/utils.js";
import jwt from "jsonwebtoken";



//registro
const registerUser = async (first_name, last_name, email, password, age) => {
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      throw new Error("El usuario ya existe.");
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
    if (password === "peligro123") {
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
      return { success: false };
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
