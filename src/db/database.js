import mongoose from 'mongoose';
import config from '../config/config.js';

const DB = config.mongoUrl;

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Conectado con éxito a MongoDB');
  } catch (error) {
    console.error('Fallo la conexión a MongoDB:', error);
    process.exit();
  }
};
