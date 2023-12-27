require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('../data/connection');
const postsRoutes = require('./posts');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan('dev'));

app.use('/posts', postsRoutes);

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // límite de conexiones
  message: 'Demasiadas solicitudes desde esta dirección IP. Por favor, intenta de nuevo más tarde.',
});

app.use(limiter);

connectDB();

app.get('/', (req, res) => {
  res.send('Find your dog');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});