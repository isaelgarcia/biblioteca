const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const livrosRoutes = require('./routes/livros');
const clientesRouter = require('./routes/clientes');

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use('/livros', livrosRoutes);
app.use('/clientes', clientesRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});