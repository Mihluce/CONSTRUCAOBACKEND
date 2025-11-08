const express = require('express');
const Projeto = require('../models/ProjetoModel');
const { create: createValidator, update: updateValidator } = require('../validators/ProjetoValidator');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/', createValidator, async (req, res) => {
  try {
    const proj = await Projeto.create(req.body);
    return res.status(201).json(proj);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const list = await Projeto.find();
  return res.json(list);
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
    const item = await Projeto.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Projeto não encontrado' });
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id', updateValidator, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
    const updated = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Projeto não encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
    const removed = await Projeto.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Projeto não encontrado' });
    return res.json({ message: 'Projeto removido' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
