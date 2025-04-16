const express = require('express');
const bodyParser = require('body-parser');
const livrosRoutes = require('./routes/livros');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use('/livros', livrosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});