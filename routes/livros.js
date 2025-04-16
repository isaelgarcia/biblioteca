const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - listar todos os livros
router.get('/', (req, res) => {
    db.query('SELECT * FROM LIVROS', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });

// POST - adicionar um livro
router.post('/', (req, res) => {
    const { titulo, autor, isbn, editor, data_publicacao } = req.body;
  
    db.query(
      'INSERT INTO LIVROS (titulo, autor, isbn, editor, data_publicacao) VALUES (?, ?, ?, ?, ?)',
      [titulo, autor, isbn, editor, data_publicacao], // <- CORRETO: 'isbn' com letras minúsculas
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, titulo, autor, isbn, editor, data_publicacao });
      }
    );
  });
  
// DELETE - deletar um livro
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM livros WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ mensagem: 'Livro removido com sucesso' });
    });
  });
  
module.exports = router;