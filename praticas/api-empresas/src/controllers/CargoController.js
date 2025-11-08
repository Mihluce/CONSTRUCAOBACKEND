const express = require('express');
const Cargo = require('../models/CargoModel');
const { create: createValidator, update: updateValidator } = require('../validators/CargoValidator');

const router = express.Router();

router.post('/', createValidator, async (req, res) => {
  try {
    const cargo = await Cargo.create(req.body);
    return res.status(201).json(cargo);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const list = await Cargo.find();
  return res.json(list);
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Cargo.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Cargo não encontrado' });
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: 'ID inválido' });
  }
});

router.put('/:id', updateValidator, async (req, res) => {
  try {
    const updated = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Cargo não encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: 'ID inválido' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Cargo.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Cargo não encontrado' });
    return res.json({ message: 'Cargo removido' });
  } catch (err) {
    return res.status(400).json({ error: 'ID inválido' });
  }
});

module.exports = router;
