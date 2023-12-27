const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Find your dog');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});