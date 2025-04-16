const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Listar todos os clientes
router.get('/', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST - Adicionar um novo cliente
router.post('/', (req, res) => {
    const { nome, sobrenome, CPF, telefone } = req.body;
    db.query(
        'INSERT INTO clientes (nome, sobrenome, CPF, telefone) VALUES (?, ?, ?, ?)',
        [nome, sobrenome, CPF, telefone],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ id: results.insertId, nome, sobrenome, CPF, telefone });
        }
    );
});

// GET - Obter um cliente por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        res.json(results[0]);
    });
});

// PUT - Atualizar um cliente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, CPF, telefone } = req.body;
    db.query(
        'UPDATE clientes SET nome = ?, sobrenome = ?, CPF = ?, telefone = ? WHERE id = ?',
        [nome, sobrenome, CPF, telefone, id],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.affectedRows === 0) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
            res.json({ mensagem: 'Cliente atualizado com sucesso', id, nome, sobrenome, CPF, telefone });
        }
    );
});

// DELETE - Deletar um cliente
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        res.json({ mensagem: 'Cliente removido com sucesso' });
    });
});

module.exports = router;