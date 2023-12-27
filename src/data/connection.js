const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Valor de MONGODB_URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB');
    console.log('Estado de la conexión:', mongoose.connection.readyState);
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1); // Salir del proceso con código de error
  }
};

module.exports = connectDB;