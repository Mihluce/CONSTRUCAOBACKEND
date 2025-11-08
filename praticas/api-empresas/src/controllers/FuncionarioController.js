const express = require('express');
const mongoose = require('mongoose');
const Funcionario = require('../models/FuncionarioModel');
const Cargo = require('../models/CargoModel');
const Departamento = require('../models/DepartamentoModel');
const { create: createValidator, update: updateValidator } = require('../validators/FuncionarioValidator');

const router = express.Router();

router.post('/', createValidator, async (req, res) => {
  try {
    // conferir se cargo e departamento existem
    const { cargo, departamento } = req.body;
    if (!mongoose.Types.ObjectId.isValid(cargo) || !mongoose.Types.ObjectId.isValid(departamento)) {
      return res.status(400).json({ error: 'IDs de cargo ou departamento inválidos' });
    }
    const cargoExists = await Cargo.findById(cargo);
    if (!cargoExists) return res.status(404).json({ error: 'Cargo não encontrado' });
    const depExists = await Departamento.findById(departamento);
    if (!depExists) return res.status(404).json({ error: 'Departamento não encontrado' });

    const func = await Funcionario.create(req.body);
    const populated = await Funcionario.findById(func._id).populate(['cargo', 'departamento']);
    return res.status(201).json(populated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const list = await Funcionario.find().populate(['cargo', 'departamento']);
  return res.json(list);
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
    const item = await Funcionario.findById(req.params.id).populate(['cargo', 'departamento']);
    if (!item) return res.status(404).json({ error: 'Funcionário não encontrado' });
    return res.json(item);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id', updateValidator, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });

    // se tentou atualizar cargo/departamento, verificar existência
    if (req.body.cargo) {
      if (!mongoose.Types.ObjectId.isValid(req.body.cargo)) return res.status(400).json({ error: 'Cargo inválido' });
      const cargoExists = await Cargo.findById(req.body.cargo);
      if (!cargoExists) return res.status(404).json({ error: 'Cargo não encontrado' });
    }
    if (req.body.departamento) {
      if (!mongoose.Types.ObjectId.isValid(req.body.departamento)) return res.status(400).json({ error: 'Departamento inválido' });
      const depExists = await Departamento.findById(req.body.departamento);
      if (!depExists) return res.status(404).json({ error: 'Departamento não encontrado' });
    }

    const updated = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['cargo', 'departamento']);
    if (!updated) return res.status(404).json({ error: 'Funcionário não encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'ID inválido' });
    const removed = await Funcionario.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Funcionário não encontrado' });
    return res.json({ message: 'Funcionário removido' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
