const express = require('express');
const Departamento = require('../models/DepartamentoModel');
const { create: createValidator, update: updateValidator } = require('../validators/DepartamentoValidator');

const router = express.Router();

router.post('/', createValidator, async (req, res) => {
  try {
    const dep = await Departamento.create(req.body);
    return res.status(201).json(dep);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const list = await Departamento.find();
  return res.json(list);
});

router.get('/:id', async (req, res) => {
  try {
    const dep = await Departamento.findById(req.params.id);
    if (!dep) return res.status(404).json({ error: 'Departamento não encontrado' });
    return res.json(dep);
  } catch (err) {
    return res.status(400).json({ error: 'ID inválido' });
  }
});

router.put('/:id', updateValidator, async (req, res) => {
  try {
    const updated = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Departamento não encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: 'ID inválido' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await Departamento.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Departamento não encontrado' });
    return res.json({ message: 'Departamento removido' });
  } catch (err) {
    return res.status(400).json({ error: 'ID inválido' });
  }
});

module.exports = router;
