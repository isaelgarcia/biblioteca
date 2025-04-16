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

// GET - obter um livro por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM LIVROS WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).json({ mensagem: 'Livro não encontrado' });
    res.json(results[0]);
  });
});

// POST - adicionar um livro
router.post('/', (req, res) => {
    const { titulo, autor, isbn, editor, data_publicacao } = req.body;

    db.query(
      'INSERT INTO LIVROS (titulo, autor, isbn, editor, data_publicacao) VALUES (?, ?, ?, ?, ?)',
      [titulo, autor, isbn, editor, data_publicacao],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, titulo, autor, isbn, editor, data_publicacao });
      }
    );
  });

// PUT - atualizar um livro
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, isbn, editor, data_publicacao } = req.body;

  db.query(
    'UPDATE LIVROS SET titulo = ?, autor = ?, isbn = ?, editor = ?, data_publicacao = ? WHERE id = ?',
    [titulo, autor, isbn, editor, data_publicacao, id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) return res.status(404).json({ mensagem: 'Livro não encontrado' });
      res.json({ mensagem: 'Livro atualizado com sucesso', id, titulo, autor, isbn, editor, data_publicacao });
    }
  );
});

// DELETE - deletar um livro
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM livros WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) return res.status(404).json({ mensagem: 'Livro não encontrado' });
      res.json({ mensagem: 'Livro removido com sucesso' });
    }
    );
  });

module.exports = router;